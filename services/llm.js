import { GoogleGenerativeAI,SchemaType } from '@google/generative-ai';
import { type } from 'os';
import companyRules from '../rule.js';
import {property, z} from 'zod'
import { zodToJsonSchema } from "zod-to-json-schema";
import fetchRules from './fetchRules.js';

const suggested = z.object({
    violated_rules:z.string().describe("The lines of code showing the original lines"),
    suggested_fix: z.string().describe("The lines of code showing the suggested fix")
})

const outputSchema = z.object({
    agentThoughts: z.string().describe("The thougth of the agent as it reads the code and reviews it agiainst the standard coding rules"),
    suggestions: z.array(suggested),
    confidence_score : z.number().describe("The number which represents the confidence of the model that this is an error")
})

const schema = {
    type: SchemaType.OBJECT,
    properties:{
        agentThoughts:{
            type:SchemaType.STRING,
            description: "The thougth of the agent as it reads the code and reviews it agiainst the standard coding rules"
        },
        suggestions:{
            type:SchemaType.ARRAY,
            items:{
                type:SchemaType.OBJECT,
                properties:{
                    violated_rules:{
                       type:SchemaType.STRING,
                        description: "The lines of code showing the original lines"
                    },
                    suggested_fix:{
                       type:SchemaType.STRING,
                        description: "The lines of code showing the suggested fix"
                    }
                }
            }
        },
        confidence_score:{
            type:SchemaType.NUMBER,
            description: "The number which represents the confidence of the model that this is an error"
        },
    },
    required: ["agentThoughts", "suggestions", "confidence_score"]
}

const generateSuggests = async(qdrantClient,badCode) => {
    try{
        const ai = new GoogleGenerativeAI(process.env.GEMINI_API);
        
        const model = ai.getGenerativeModel({
            model: "gemini-3.1-flash-lite",
            generationConfig:{
                responseMimeType: "application/json",
                responseSchema: schema
            }
        })

        const rules = await fetchRules(qdrantClient,badCode)

        const prompt = `
        You are a strict Senior AI Engineer reviewing a junior developer's Pull Request.

        COMPANY ENGINEERING STANDARDS:
        ${rules}

        JUNIOR DEVELOPER'S CODE:
        ${badCode}

        Analyze the code against the standards. Provide your thoughts, list the violated rules, and write the fixed code.
        `;


        const output = await model.generateContent(prompt);
        console.log(output.response.text());
        
        let response = output.response.text()
        response = outputSchema.parse(JSON.parse(response))
        return response
    }
    catch(err){
        console.log(err);
        throw Error(err.message,{cause:err})
    }
}

export default generateSuggests