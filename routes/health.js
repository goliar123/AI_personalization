import { redisClientConnection } from "../services/redis.js";
import qdrantClientConnection from "../services/qdrant.js";
const health = async(req,res)=>{
    try{
        const redisClient = req.app.locals.redis    
        const qdrantClient = req.app.locals.qdrant
        const val = await redisClient.ping()
        const result = await qdrantClient.getCollection(process.env.COLLECTION_NAME)
        if(val!="PONG" || result==null){
            throw Error("Error while verifying connections",{cause:"The server are down for redis or qdrant"})
        }
        res.status(201).json({ 
            message: "pinged successfully",
            val : val,
            res: result
        });
    }
    catch(err){
        throw new Error("Enable to reach health",{cause:err})
    }
}

export default health