const express = require("express");
const router = express.Router();
const {signin, login, getusers} = require("../controllers/user.js");
const authorization = require("../middleware/authorization.js");
const  adminRole = require("../middleware/admin.js");


router.post("/users/signin", signin)
router.get("/users/getusers", authorization, adminRole, getusers) //Only admin can see list of users
router.post("/users/login",login)


module.exports = router;