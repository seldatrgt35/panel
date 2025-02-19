const express = require("express");
const router = express.Router();
const { getServicesByBusiness } = require("../controllers/ServiceController");

router.get("/:businessId", getServicesByBusiness);

module.exports = router;
