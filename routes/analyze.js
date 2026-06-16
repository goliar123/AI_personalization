import analyzeCode from "../services/analyzeCode.js";

const analyze = async(req,res) =>{
    const code = req.body.code;
    
    const response = await analyzeCode(req.app.locals.qdrant,code);
    res.status(200).json({
        response: response
    })
}

export default analyze