

const express = require("express");
const router = express.Router();
const {create, retrieve, del, update} = require("../controllers/product");

router.post("/products/add", create)
router.put("/products/edit/:product_id", update)
router.delete("/products/del/:product_id", del)
router.get("/products/get", retrieve)

module.exports = router;