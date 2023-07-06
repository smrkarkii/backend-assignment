const jwt = require("jsonwebtoken")
require("dotenv").config();


const jwtgenerator = (user) => {
    const payload = {
        user: {
            id: user.user_id,
            role: user.role 
        }
    }
return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 100000000})
}

module.exports = jwtgenerator