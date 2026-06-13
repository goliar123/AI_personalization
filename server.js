import express from "express"
import create from "./routes/create.js"
import {redisClientConnection} from "./services/redis.js"
import qdrantClientConnection from "./services/qdrant.js"
import { log } from "console"
import dotenv from "dotenv"
import health from "./routes/health.js"


const app = express()
dotenv.config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("Dumb motherfucker")
})
app.get("/health",health)
app.get("/create",create)

const server_start = async()=>{
    try{
        await redisClientConnection()
        console.log("redis Done")
        await qdrantClientConnection()
        console.log("qdrant Done")
        app.listen(process.env.PORT,async ()=>{
            console.log(`Listening at PORT ${process.env.PORT}`)
            console.log("Connections established");
        })
    }
    catch(err){
        console.log(`${err}`);
    }    
}
server_start()

