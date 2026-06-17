import generateSuggests from "../services/llm.js";
const generate = async(req,res) =>{
    try{
        console.log(req.body);
        
        const code = req.body.code;
        const response = await generateSuggests(req.app.locals.redis,req.app.locals.qdrant,code);        
        res.status(200).json({
            response:response
        })
    }
    catch(err){
        throw Error("Error in route generate",{cause:err})
    }
}

export default generate