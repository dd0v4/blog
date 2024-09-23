const userModel = require("../models/userModel");

const authguard = async (req, res, next) => {
    try{
        if (req.session.user){
            let user = await userModel.findOne({_id: req.session.user._id});
            if(user){
                return next();
            }
        }
        throw new Error("User not connected.");
    }catch(error){
        console.error(error.message);
        res.status(401).render("./pages/admin.twig", 
        {
            title: "d0v4 / Login",
            errorAuth: error.message
        });
    }
}

module.exports = authguard;