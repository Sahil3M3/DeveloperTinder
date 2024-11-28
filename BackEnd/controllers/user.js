const userService=require('../services/user');

module.exports.getRequest=async (req,res,next) => {
    
    const result=await userService.getRequests(req);
    res.status(result.status).json(result.result);
}

module.exports.getConnection=async (req,res,next) => {
    const result=await userService.getConnections(req);
    res.status(result.status).json(result.result);
}