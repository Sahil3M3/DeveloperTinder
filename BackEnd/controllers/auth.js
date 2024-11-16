const serviceAuth=require("../services/auth")

module.exports.signup=async (req,res) => {
    const result =await serviceAuth.signUp(req);

    res.status(result.status).send(result.result);
}

module.exports.signIn=async (req,res) => {
    const result =await serviceAuth.signIn(req);

    res.status(result.status).send(result.result);
}