const jwt = require("jsonwebtoken")
require("dotenv").config();


const jwtgenerator = (user_id) => {
const payload = {
    user:user_id
}
return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60})
}

module.exports = jwtgenerator