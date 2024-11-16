const mongoose=require("mongoose");
const { type } = require("node:os");

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

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;
