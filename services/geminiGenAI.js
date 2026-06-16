import {GoogleGenAI} from "@google/genai"
import { log } from "console"

const generateEmbeddings = async(content) =>{    
    try{        
        console.log("HI");
        
        const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API})
        const output = await ai.models.embedContent({
            model: "gemini-embedding-2",
            contents : content
        })
        return output
    }
    catch(err){
        console.log(err);
        throw Error("Error while sending request to google",{content:err})
    }
}

export {generateEmbeddings}