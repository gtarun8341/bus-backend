const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all trips
router.get('/', tripController.getAllTrips);

// GET a single trip by ID
router.get('/:id', tripController.getTripById);

router.get('/busroute/:busRouteId', tripController.getTripByBusRouteId);

router.get('/driver/:driverId', tripController.getTripsByDriverId);

// POST create a new trip
router.post('/', tripController.createTrip);

// PUT update a trip by ID
router.put('/:id', tripController.updateTrip);

// DELETE a trip by ID
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
