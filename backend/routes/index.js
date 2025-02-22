const express = require("express");
const router = express.Router();

const businessRoutes = require("./BusinessRoutes");
const userRoutes = require("./UserRoutes");
const customerRoutes = require("./CustomerRoutes");
const appointmentRoutes = require("./AppointmentRoutes");
const serviceRoutes = require("./ServiceRoutes");

router.use("/business", businessRoutes);
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/services", serviceRoutes);

// Basit bir test rotası
router.get('/', (req, res) => {
    res.status(200).send('API is working!');
});

module.exports = router;
