const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// Tüm işletmeleri getir
router.get('/business', businessController.getAllBusinesses);
// Tek bir işletmeyi ID ile getir
router.get('/business/:id', businessController.getBusinessById);

module.exports = router;
