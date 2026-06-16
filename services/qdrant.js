import { log } from "node:console";
import {QdrantClient} from "@qdrant/js-client-rest"
import { type } from "node:os";

const qdrantClientConnection = async()=>{
    let qdrantClient = null
    try{
        if(qdrantClient==null){
            qdrantClient = new QdrantClient({host:process.env.QDRANT_URL,port:6333})
            const exists = await qdrantClient.collectionExists(process.env.COLLECTION_NAME);
            if(exists.exists==false){
                const res = await qdrantClient.createCollection(process.env.COLLECTION_NAME,{
                    vectors:{
                        size: 3072,
                        distance: "Cosine"
                    }
                })
                console.log(res)
            }
        }
    }
    catch(err){
        qdrantClient = null
        throw Error("Error while establishing qdrant connections",{cause: err})
    }
    finally{
        return qdrantClient
    }
}
export default qdrantClientConnection