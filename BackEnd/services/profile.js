const {validateEditProfileData}=require("../util/validation")


module.exports.getProfile=async (req) => {
     
    
    return {status:200,result:req.user}
}

module.exports.editProfile=async (req) => {

    try{
if(!validateEditProfileData(req)){
    throw new Error("Invalid Edit Request");
}

Object.keys(req.body).forEach((key)=>(req.user[key]=req.body[key]));
await req.user.save();


return {status:200,result:"Your Profile Was Edited Successfully"}
    }
    catch(e)
    {
       
        
        return {status:400,result:e.message}
    }

    
}