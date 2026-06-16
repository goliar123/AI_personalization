import fetchReview from "../services/fetchReview.js"

const getReview = async (req,res) =>{
    try{
        const output = await fetchReview(req.app.locals.redis,req.body.id);
        res.status(201).json({
            response: output,
        })
    }   
    catch(err){
        throw Error(err.message,{cause:err})
    }
}

export default getReview