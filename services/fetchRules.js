import { Hash } from "crypto";
import {v5 as uuidv5} from "uuid"
import {v4 as uuidv4} from 'uuid'
import { log } from "console";
import {generateEmbeddings} from "./geminiGenAI.js";

const fetchRules = async(qdrantClient,content) =>{
    try{
        
        const response = await generateEmbeddings(content);
        // const val = uuidv5(content,process.env.Key);        
        
        const output = await qdrantClient.query(process.env.COLLECTION_NAME,{
            // id:JSON.stringify(val),
            vector: response.embeddings[0].values,
            with_payload:true,
        })
        return output
    }
    catch(err){
        console.log(err);
        throw new Error("Error while fetching rules",{
            cause:err
        })
    }
}

export default fetchRules