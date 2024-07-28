const express = require('express');
const router = express.Router();
const driverProfileController = require('../controllers/driverProfileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, driverProfileController.getDriverProfile);
router.get('/id/:id', driverProfileController.getDriverById);
router.get('/all',  driverProfileController.getAllDrivers);
router.put('/', authMiddleware, driverProfileController.updateDriverProfile);

module.exports = router;
