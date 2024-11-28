const ConnectionRequest=require("../models/connectionRequest")

module.exports.getRequests=async (req) => {

    try {
        const connectionRequest=await ConnectionRequest.find({
            toUserId:req.user._id,
            status:"interested",
        }).populate("fromUserId",["firstName","lastName","about","skills","age","gender","_id","photoUrl"])//.select({"["firstName","lastName","about","skills","age","gender","_id"]});
        
        

        return {status:200,result:connectionRequest};

    } catch (error) {
        return {status:400,result:error.message}
    }
    
}

module.exports.getConnections=async (req) => {
    const USER_SAFE_DATA=["firstName","lastName","about","skills","age","gender","_id","photoUrl"]
try {

    let connectionRequest=await ConnectionRequest.find({
        $or:[
            {toUserId:req.user._id,status:"accepted"},
            {fromUserId:req.user._id,status:"accepted"},
        ]
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

    connectionRequest=connectionRequest.map((row)=>{
        if(row.fromUserId._id.toString()===req.user._id.toString())
        return row.toUserId;


        return row.fromUserId;
    })

    return {status:200,result:connectionRequest};
    
} catch (error) {
    return {status:400,result:error.message}
}


}