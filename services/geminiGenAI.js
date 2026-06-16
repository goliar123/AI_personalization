import {GoogleGenAi} from "@google/genai"



const generateEmbeddings = async(content) =>{    
    try{        
        const ai = new GoogleGenAi({apiKey:process.env.GEMINI_API})
        const output = await ai.models.embedContent({
            model: "gemini-embedding-2",
            content : content
        })
        return output
    }
    catch(err){
        console.log(err);
        throw Error("Error while sending request to google",{content:err})
    }
}

export {generateEmbeddings}