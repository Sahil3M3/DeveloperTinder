const mongoose=require("mongoose")

const connectionRequestSchema= new mongoose.Schema({

    formUserId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
required:true
    },
    
    toUserId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
required:true


    },
    status:{
        type:String,
required:true,
        enum:{
            values:["ignore","interested","accepeted","rejected"],
            message:`{VALUE} is incorrect status type`
        }

    }
    
},
  {
    timestamps:true
    }

)

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;

    if(connectionRequest.formUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to Yourself");
    }
    next();
})


const ConnectionRequestModel=new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports=ConnectionRequestModel;