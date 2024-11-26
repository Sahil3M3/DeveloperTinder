const ConnectionRequest=require("../models/connectionRequest");

module.exports.addNewRequest=async (req)=>{

    try{
        const formUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
const connectionRequest=new ConnectionRequest( {
    formUserId,toUserId,status
})

await connectionRequest.save()
return { status:200,result:"Request ayyi"}
    }
    catch(e){
        return { status:400,result:e.message}

    }
    
}