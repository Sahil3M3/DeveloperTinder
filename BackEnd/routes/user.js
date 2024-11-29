const {Router}=require("express");

const userRouter=Router();
const userController=require("../controllers/user")
const auth=require("../middlewares/auth");  

userRouter.get('/request/received',auth,userController.getRequest);
userRouter.get('/request/connections',auth,userController.getConnection);
userRouter.get('/request/feed',auth,userController.getFeed);


module.exports=userRouter;