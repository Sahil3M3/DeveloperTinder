const express=require("express");
const profileRouter=express.Router();
const profileController=require("../controllers/profile");
const auth=require("../middlewares/auth");


profileRouter.get('/',auth,profileController.getProfile);

module.exports=profileRouter;