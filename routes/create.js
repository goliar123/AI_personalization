import { redisClientConnection } from "../services/redis.js";

const create = async(req,res)=>{
    try{
        const client = await redisClientConnection()        
        const val = await client.set("req.body.key","req.body.val");
        res.status(201).json({ 
            message: "Entry created successfully",
            key: req.body.key,
            redisResponse: val 
        });
    }
    catch(err){
        res.status(500).json({ 
            message: "Entry unsuccessfully",
            err: err
        });
    }
}

export default create