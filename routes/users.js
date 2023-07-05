const express = require("express");
const router = express.Router();
const {signin, login, getusers} = require("../controllers/user.js");

router.post("/users/signin", signin)
router.get("/users/getusers", getusers)
router.post("/users/login", login)

module.exports = router;