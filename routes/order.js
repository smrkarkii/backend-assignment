const express = require("express");
const router = express.Router();
const {create, edit, get,del} = require("../controllers/order.js");
const authorization = require("../middleware/authorization.js")
const adminRole = require("../middleware/authorization.js")


router.post("/orders/add",authorization ,create);
router.put("/orders/edit/:order_id",authorization , edit)
router.delete("/orders/del/:order_id",authorization , del)
router.get("/orders/get/:order_id",authorization , adminRole, get)//only admin can see all the orders from different users

module.exports = router;