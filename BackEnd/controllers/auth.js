const serviceAuth=require("../services/auth")

module.exports.signup=async (req,res) => {
    const result =await serviceAuth.signUp(req);

    res.status(result.status).json(result.result);
}

module.exports.signIn=async (req,res) => {
    const result =await serviceAuth.signIn(req);

    res.cookie("token",result.token,{expires:new Date(Date.now()+3000000)});
    res.status(result.status).json(result.result);
}

module.exports.logout=async (req,res,next) => {

    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.json("User have LogOut ");
    
}