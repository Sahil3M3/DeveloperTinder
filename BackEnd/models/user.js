const mongoose=require("mongoose");
const { type } = require("node:os");
const jwt=require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
trim:true,
    },
    password:{
        type:String,
        required:true

    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(v){
            if(!["male","female","others"].includes(v))
            {
throw new Error("Gender is not Valid");
            }
        }
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:"This is default About"
    },
    skills:{
        type:[String]
    }
});


userSchema.methods.getJWT =function(){
    const user=this;
    const key="Harsha";
    const token=jwt.sign({_id:user._id},key,{expiresIn:"2h"});
    
    return token;
}
const userModel=mongoose.model("User",userSchema);

module.exports=userModel;
