const jwt = require("jsonwebtoken")
require("dotenv").config();


module.exports = async (req,res,next) => {
    const jwTOken = req.header("token")

    try {
        if(!jwTOken){
            return res.status(403).send("Not authorized")
        }
        const payload = jwt.verify(jwTOken, process.env.jwtSecret)
        req.user = payload.user;
        console.log(payload.user)
         
    } catch (err) {
        console.log(err.message)
        return res.status(403).json("Not authorized")
    }
     return next()
}