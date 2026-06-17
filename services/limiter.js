import {rateLimit} from "express-rate-limit"

const limit = rateLimit({
    windowMs: 15*60*1000,
    max:10,
    message:"Too many request in a hour"
})

export default limit