const jwt = require("jsonwebtoken")
require("dotenv").config();


const jwtgenerator = (user_id) => {
const payload = {
    user:user_id
}
return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 1000})
}

module.exports = jwtgenerator