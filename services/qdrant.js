import { url } from "inspector"
import {Qdrant} from "qdrant"

let qdrantClient = null

const qdrantClientConnection = async()=>{
    try{
        if(qdrantClient==null){
            qdrantClient = new Qdrant(process.env.QDRANT_URL)
            const schema = {
                "name":process.env.COLLECTION_NAME,
                "vector_size": 3,
                "distance": "Cosine"
            };
            let res = await qdrantClient.create_collection(process.env.COLLECTION_NAME,schema)
            if(res.err){
                console.lof(err)
            }
            else console.log("Success")
        }
        return qdrantClient
    }
    catch(e){
        console.log(e);
    }
}
export default qdrantClientConnection