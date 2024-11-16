const profileService=require("../services/profile");


module.exports.getProfile=async (req,res) => {
    
    const result=await profileService.getProfile(req);
    res.status(result.status).send(result.result);
}