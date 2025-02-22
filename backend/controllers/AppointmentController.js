const { Appointment } = require("../models");

// Tüm Randevuları Listele
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
