const profileService=require("../services/profile");


module.exports.getProfile=async (req,res) => {
    
    const result=await profileService.getProfile(req);
    res.status(result.status).json(result.result);
}

module.exports.edit=async(req,res,next)=>{

    const result=await profileService.editProfile(req);
    res.status(result.status).json(result.result);

}