const express = require("express");
const router = express.Router();
const {signin, login, getusers} = require("../controllers/user.js");
const authorization = require("../middleware/authorization.js");


router.post("/users/signin", signin)
router.get("/users/getusers", getusers)
router.post("/users/login", login)
router.post("/users/auth", authorization)

module.exports = router;