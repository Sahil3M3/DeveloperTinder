const express=require("express");

const authRoutes=express.Router();
const authController=require("../controllers/auth")


authRoutes.get("/signup",authController.signup)


module.exports=authRoutes;