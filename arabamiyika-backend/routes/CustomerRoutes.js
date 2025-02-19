const express = require("express");
const router = express.Router();
const { getCustomerByReference } = require("../controllers/CustomerController");

router.get("/:referenceCode", getCustomerByReference);

module.exports = router;
