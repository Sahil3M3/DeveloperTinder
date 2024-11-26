const {Router}=require("express");
 const requestRouter=Router();

const auth=require('../middlewares/auth')
const requestController=require("../controllers/request");


requestRouter.post('/send/:status/:toUserId',auth,requestController.addRequest);


 module.exports=requestRouter;