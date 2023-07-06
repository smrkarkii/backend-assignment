

const express = require("express");
const router = express.Router();
const {create, retrieve, del, update} = require("../controllers/product");
const authorization = require("../middleware/authorization");
const adminRole= require("../middleware/admin")

router.post("/products/add", authorization, adminRole, create)
router.put("/products/edit/:product_id", authorization, adminRole, update)
router.delete("/products/del/:product_id", authorization, adminRole, del)
router.get("/products/get", authorization, adminRole, retrieve)

module.exports = router;
