const express = require('express');
const router = express.Router();
const busStopsController = require('../controllers/busStopsController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all bus stops
router.get('/', (req, res) => {
    console.log("Request received to fetch all bus stops");
    busStopsController.getAllBusStops(req, res);
  });
// Get one bus stop
router.get('/:id', busStopsController.getBusStop);

// Create a bus stop
router.post('/', busStopsController.createBusStop);

// Update a bus stop
router.put('/:id', busStopsController.updateBusStop);

// Delete a bus stop
router.delete('/:id', busStopsController.deleteBusStop);

module.exports = router;
