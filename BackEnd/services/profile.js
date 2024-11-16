
module.exports.getProfile=async (req) => {
 
   console.log(req.user.firstName);
    
    
    return {status:200,result:req.user}
}