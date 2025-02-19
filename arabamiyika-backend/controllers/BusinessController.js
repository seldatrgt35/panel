const Business = require('../models/Business');

// Tüm işletmeleri getir
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.findAll({
            attributes: ['id', 'business_name', 'description', 'email', 'phone_gsm'],
        });

        res.json(businesses);
    } catch (error) {
        console.error('Error fetching businesses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Tek bir işletmeyi getir
exports.getBusinessById = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await Business.findByPk(id, {
            attributes: ['id', 'business_name', 'description', 'email', 'phone_gsm'],
        });

        if (!business) {
            return res.status(404).json({ error: 'Business not found' });
        }

        res.json(business);
    } catch (error) {
        console.error('Error fetching business by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
