const express=require("express");

const authRoutes=express.Router();
const authController=require("../controllers/auth")


authRoutes.post("/signup",authController.signup);
authRoutes.post("/signin",authController.signIn);
authRoutes.post("/logout",authController.logout);

module.exports=authRoutes;