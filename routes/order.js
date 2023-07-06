const express = require("express");
const router = express.Router();
const {create, edit, get,del} = require("../controllers/order.js");
const {authorization} = require("../middleware/authorization.js")
router.post("/orders/add", create);
router.put("/orders/edit/:order_id", edit)
router.delete("/orders/del/:order_id", del)
router.get("/orders/get", get)

module.exports = router;