const express = require('express');
const router = express.Router();
const busLocationController = require('../controllers/busLocationController');

router.get('/:busId', busLocationController.getBusLocation);

module.exports = router;
