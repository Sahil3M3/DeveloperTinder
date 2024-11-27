const requestService=require("../services/request")

module.exports.addRequest=async (req,res,next)=>{

const result=await requestService.addNewRequest(req);
res.status(result.status).json(result.result);

}

module.exports.reviewRequest=async (req,res,next) => {
    
    const result=await requestService.reviewRequest(req);
    res.status(result.status).json(result.result);

}