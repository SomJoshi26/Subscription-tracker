import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
const decision = await aj.protect(req , {requested : 1});
if(decision.isDenied()){
    if(decision.reason.isRateLimit()) return res.status(429).json({error : "Rate limit exceeded. Please try again later."})
        if(decision.reason.isBot()) return res.status(403).json({error : "Bots are not allowed to access this resource."})

    res.status(403).json({error : "Access denied by Arcjet."})        
}
next();
    } catch (error) {
        console.error("Error in Arcjet middleware:", error);
        next(error);
    }
}
export default arcjetMiddleware;