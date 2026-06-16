
const fetchReview = async (redisClient,id)=>{
    try{
        const output = await redisClient.get(`pending_review:${id}`);
        await redisClient.del(`pending_review:${id}`)
        if(output==null){
            throw Error("The item doesnt exists",{
                cause:{
                    status: 503,
                    message: "Action Completed"
                }
            })
        }
        return JSON.parse(output)
    }   
    catch(err){
        throw Error(err.message,{cause:err})
    }
}

export default fetchReview