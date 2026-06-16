const global_error_handler = (err,req,res,next) =>{   

    let causeDetail = err.cause;
    if (err.cause instanceof Error) {
        causeDetail = {
            type: err.cause.name,   
            reason: err.cause.message, 
            stack: err.cause.stack   
        };
    }

    res.status(503).json({
        errorType: err.name,
        message: err.message,
        originalError: causeDetail
    });
}

export default global_error_handler;