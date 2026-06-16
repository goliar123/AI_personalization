import { createClient } from "redis";

let client = null

const redisClientConnection = async() =>{
    try{
        if(client==null){
            client = createClient({
                url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
            })
            await client.connect();
        }
    }
    catch(err){
        client = null
        throw Error("Error while establishing redis",{
            cause:err
        })
    }
    finally{
        return client
    }
}
export {client,redisClientConnection}