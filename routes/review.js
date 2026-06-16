

const review = async (req,res) =>{
    try{
        const redisClient = req.app.locals.redis
        const response = await redisClient.get(`pending_review:${req.body.id}`)
        const output = JSON.parse(response)
        res.status(200).json({
            output: output,
        })
    }
    catch(err){
        throw new Error("Error while fetching the id from redis for review",{
            cause: err,
        })
    }
}

export default review