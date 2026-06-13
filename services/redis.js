import { createClient } from "redis";

let client = null

const redisClientConnection = async() =>{
    if(client==null){
        try{
            client = createClient({
                url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
            })
            await client.connect();
        }
        catch(err){
            console.error(`error while redis connections ${err}`)
        }
    }
    return client
}
export {client,redisClientConnection}