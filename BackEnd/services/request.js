const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user")

module.exports.addNewRequest=async (req)=>{

    try{
        const formUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
       const allowedStatus=["ignore","interested"];

       if(!allowedStatus.includes(status)){
        return { status:400,result:"Invalid status type : "+status}
        
       }
const toUser=await User.findById(toUserId);

if(!toUser){
    throw new Error("User Not Found");
}
//if Connection is not double 
const existingConnectionRequest=await ConnectionRequest.findOne({
    $or:[
{formUserId,toUserId},
{formUserId:toUserId,toUserId:formUserId}
    ]
})

if(existingConnectionRequest){
throw new Error("Connection Request is already Present")
}


       const connectionRequest=new ConnectionRequest( {
           formUserId,toUserId,status
       })
       
       await connectionRequest.save()
       return { status:200,result:req.user.firstName+" "+status+" "+toUser.firstName}


    }
    catch(e){
        return { status:400,result:e.message}

    }
    
}

module.exports.reviewRequest=async (req) => {

try {
    const loggedInUser=req.user;
    const status=req.params.status;
    const requestId=req.params.requestId;

    const allowedStatus=["accepted","rejected"];

    if(!allowedStatus.includes(status)){
        throw new Error("Status Not Allowed");
    }

    const connectionRequest=await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested"
    });

   if(!connectionRequest){
    throw new Error("Connection is not found");
   }
   connectionRequest.status=status;
   await connectionRequest.save();
return {status:200,result:"Connection request "+status};

} catch (error) {
    return {status:400,result:error.message}
}
    
}