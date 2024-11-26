const express=require("express");
const profileRouter=express.Router();
const profileController=require("../controllers/profile");
const auth=require("../middlewares/auth");


profileRouter.get('/view',auth,profileController.getProfile);
profileRouter.patch('/edit',auth,profileController.edit);


module.exports=profileRouter;