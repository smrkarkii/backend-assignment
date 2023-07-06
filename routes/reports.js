

const express = require("express");
const router = express.Router();
const {topSellingProducts, dailySales} = require("../controllers/reports");
const authorization = require("../middleware/authorization")
const adminRole = require("../middleware/admin")

router.get("/reports/dailySales", authorization, adminRole,dailySales)
router.get("/reports/topSellingProducts",authorization, adminRole,topSellingProducts)

module.exports = router;