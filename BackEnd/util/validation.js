const validator =require("validator")

function validateSignUpData(req){

const {firstName,lastName,password,emailId}=req.body;

if(!firstName || !lastName){
    throw new Error("Name is not valid");
}
else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid");
}
// else if(validator.isStrongPassword(password)){
//     throw new Error("Please give a Strong password");
// }


}
validateEditProfileData=(req)=>{

    const allowedEditFields = ["firstName","lastName","photoUrl","age","gender","emailId","about","skills"];

    const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports={validateSignUpData,validateEditProfileData}