const jwt  = require("jsonwebtoken");
const {JWT_SECRET} = require("./config.js")
const authMiddleware  =( req,res,next)=>{
    // console.log(req);
    const authHeader = req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer')){
        return res.status(403).json({msg:"authHeader not found"})
    }
    const token = authHeader.split(' ')[1];  
     
    try{
       
        const decode = jwt.verify(token,JWT_SECRET);
        console.log(decode);
        if(decode){
            
            req.userId =  decode.userId;
            next();
        }else{
            return res.status(403).json({})
        }
    }
    catch(err){
        return res.status(403).json({
            msg:"there is an error",
            error:err
        })
    }
}
module.exports = {authMiddleware};