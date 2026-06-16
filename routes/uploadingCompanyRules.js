import { redisClientConnection } from "../services/redis.js";
import {generateEmbeddings} from "../services/geminiGenAI.js";
import { createHash, Hash, hash, randomUUID } from "crypto";
import {v5 as uuidv5} from 'uuid'
import companyRules from "../rule.js";

const uploadingCompanyRules = async(qdrant)=>{
    try{
        let output = [] 
        let len = companyRules.length
        for(let i=0;i<len;i++){
            let content = companyRules[i]            
            let temp = `Category:${content.category} Rule: ${content.text}` 
            const response = await generateEmbeddings(temp);
            const val = uuidv5(temp,process.env.Key)
            const result = await qdrant.upsert(
                process.env.COLLECTION_NAME,
                {
                    wait:true,
                    points:[
                        {
                            id:val,
                            vector: response.embeddings[0].values,
                            payload : {
                                "description":temp,
                                "severity":content.severity,
                            }
                        }
                    ],
                }
            )           
            output.push(result)

        }
        console.log(
            "Successfully completed the operations",
            output
        )

    }
    catch(err){
        throw Error("Enable to create entry",{cause:err})
    }
}

export default uploadingCompanyRules