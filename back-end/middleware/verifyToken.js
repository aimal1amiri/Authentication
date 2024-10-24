import jwt from "jsonwebtoken";

export const verifyToken = (req,res, next) => {
    
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success:false,message:"Unautherized request"});
    }
    
    try {
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        
        if(!decoded){
            return res.status(401).json({success:false, message:"Invalid request"});
        }

        next()
        // the -next()- function is for , when the -verifyToken- function execute successfully then in -auth-route- file there is endpoint which has got two function, so whatever is in second function it will execute the second funciton. 

        
    } catch (error) {

        return res.status(500).json({success:false, message:"Server Error"});
        
    }
}