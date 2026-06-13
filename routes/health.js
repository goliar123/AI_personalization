import { redisClientConnection } from "../services/redis.js";
import qdrantClientConnection from "../services/qdrant.js";
const health = async(req,res)=>{
    try{
        const redisClient = await redisClientConnection()      
        const qdrantClient = await qdrantClientConnection()
        const val = await redisClient.ping()
        const result = await qdrantClient.get_collection(process.env.COLLECTION_NAME)
        if(val!="PONG" || res==null){
            throw Error({message:"Error while verifying connections"})
        }
        res.status(201).json({ 
            message: "pinged successfully",
            val : val,
            res: result
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ 
            err: err
        });
    }
}

export default health