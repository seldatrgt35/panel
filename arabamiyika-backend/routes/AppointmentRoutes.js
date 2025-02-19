const express = require("express");
const router = express.Router();
const { getAllAppointments } = require("../controllers/AppointmentController");

router.get("/", getAllAppointments);

module.exports = router;
