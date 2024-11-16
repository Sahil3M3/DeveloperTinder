const jwt=require("jsonwebtoken");
const User=require("../models/user");

const auth=async(req,res,next)=>{
  try{
    const cookie=req.cookies;
    if(!cookie)
    {
        throw new Error("Invalid token ! ,Please Login In first");
    }
    
    const {token}=cookie;
    const key="Harsha";
    
    const decoded=jwt.verify(token,key);
    
    const {_id}=decoded;
    if(!_id){
        throw new Error("Please Login In first");
    }
    
    const user=await User.findById(_id);
    if(!user){
        throw new Error("No User Found !");
    }


    req.user=user;
    
    next();


  }
  catch(e){
    res.status(400).send(e);

  }

}
module.exports=auth;