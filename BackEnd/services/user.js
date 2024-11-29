const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");

const USER_SAFE_DATA=["firstName","lastName","about","skills","age","gender","_id","photoUrl"]
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

module.exports.getFeeds=async (req) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
    
        const connectionRequests = await ConnectionRequest.find({
          $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
        }).select("fromUserId  toUserId");
    
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
          hideUsersFromFeed.add(req.fromUserId.toString());
          hideUsersFromFeed.add(req.toUserId.toString());
        });
    
        const users = await User.find({
          $and: [
            { _id: { $nin: Array.from(hideUsersFromFeed) } },
            { _id: { $ne: loggedInUser._id } },
          ],
        })
          .select(USER_SAFE_DATA)
          .skip(skip)
          .limit(limit);
        
          return {status:200,result:users};
        

    } catch (error) {
        return {status:400,result:error.message};
    }
}