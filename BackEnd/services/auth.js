const {validateSignUpData}=require("../util/validation")
const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");


module.exports.signUp= async(req)=>{
   const {firstName,lastName,password,emailId}=req.body;
   try{
      //validate the data from the Request Object 
validateSignUpData(req);

 //Encrypt the password
 const hashPassword=await bcrypt.hash(password,5);


    //create new instance os the user model
const user=new User({firstName,lastName,password:hashPassword,emailId});

await user.save();

return {status:200,result:"User Added successfully!"};

   }
   catch(e){
return {status:400,result:e.message};
   }

}

module.exports.signIn=async (req) => {
   try{
      const {emailId,password}=req.body;

      const user=await User.findOne({emailId});
      if(!user){
         throw new Error("User Does'not Exist");
      }

      const isPasswordValid=await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
         throw new Error("Password is Wrong ! ,Please Enter Correct Password");
      }

      
      //create token 
      const token=user.getJWT();

      return {status:200,result:"User have successfully Logged In" ,token:token};
   }
   catch(e){
      return {status:400,result:e.message}
   }
}

