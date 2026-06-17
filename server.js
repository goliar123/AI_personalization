import express from "express"
import uploadingCompanyRules from "./routes/uploadingCompanyRules.js"
import global_error_handler from "./error_handler/global_error_handler.js" 
import {redisClientConnection} from "./services/redis.js"
import qdrantClientConnection from "./services/qdrant.js"
import { log } from "console"
import dotenv from "dotenv"
import health from "./routes/health.js"
import uuid from "crypto"
import generate from "./routes/generate.js"
import getReview from "./routes/getReview.js"
import review from "./routes/review.js"
import cors from "cors"
import limit from "./services/limiter.js"

let redisTrue=false,qdrantTrue = false;

const app = express()
dotenv.config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST"],
    // credentials:true
}))
app.use(limit)


app.get("/",(req,res)=>{
    const date = new Date()
    res.status(200).json({
        message:"Hello World",
        time: date.toLocaleDateString(),
        id : uuid.randomUUID()
    })
})
app.get("/api/health",health)

app.get("/api/review/:id",review)

app.post("/api/approve/:id",getReview)

app.post("/api/generate",generate)


const MAX_RETRIES = 1
const MAX_INTERVAL = 3000


const gradefulshutdown= async (reason)=>{
    try{
        console.log("Shutting down the process due to",reason);
        app.close(()=>{
            console.log("New Requests not accepted anymore for a time period")
        })
        if(app.locals.redis){
            await app.locals.redis.quit();
        }
        console.log("Graceful shutdown complete");
        
    }
    catch(err){
        console.log("Error while shutting down");
    }
}

const sleep = async(n)=>{
    return new Promise(resolve => setTimeout(resolve,n));
}

const server_start = async()=>{
    let retry = 0
    try{
        let count = 0
        let redisClient = null
        let qdrantClient = null
        while(retry<MAX_RETRIES && (redisTrue==false || qdrantTrue==false)){
            redisClient = await redisClientConnection();
            if( redisClient != null){
                console.log("redis Done")
                redisTrue = true;
            }
            qdrantClient = await qdrantClientConnection();
            if(qdrantClient != null){
                console.log("qdrant Done")
                qdrantTrue =true;
            }
            
            await sleep(MAX_INTERVAL)
            retry++;
        }
        app.locals.redis = redisClient
        app.locals.qdrant = qdrantClient
        // await uploadingCompanyRules(qdrantClient)
        app.listen(process.env.PORT,async ()=>{
            console.log(`Listening at PORT ${process.env.PORT}`)
            if(redisClient===null || qdrantClient===null){
                console.log("Some Services are not available")
            }
            else console.log("Connections established");
        })
    }
    catch(err){
        console.log("Error while creating server connections",err)
    }    
}

server_start()
app.use(global_error_handler)

process.on("uncaughtException",(error)=>{
    console.log(error);
    gradefulshutdown("uncaughtException")
})

process.on("unhandledRejection",(error)=>{
    console.log(error);
    gradefulshutdown("unhandledRejection")
})
