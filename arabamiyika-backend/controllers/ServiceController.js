const { Service } = require("../models");

// İşletme Hizmetlerini Listele
exports.getServicesByBusiness = async (req, res) => {
    try {
        const services = await Service.findAll({
            where: { BusinessId: req.params.businessId },
        });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
