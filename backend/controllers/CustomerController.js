const { Customer, Appointment } = require("../models");

// Referans Kodu ile Müşteri Bilgisi Getir
exports.getCustomerByReference = async (req, res) => {
    try {
        const { referenceCode } = req.params;
        const customer = await Customer.findOne({
            where: { referenceCode },
            include: [Appointment],
        });

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
