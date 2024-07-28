const express = require('express');
const router = express.Router();
const busRouteController = require('../controllers/busRouteController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all bus routes
router.get('/', busRouteController.getAllBusRoutes);

// GET a single bus route by ID
router.get('/:id', busRouteController.getBusRouteById);

router.get('/busroutes/:busId', busRouteController.getRouteByBusId);

// POST create a new bus route
router.post('/', busRouteController.createBusRoute);

// PUT update a bus route by ID
router.put('/:id', busRouteController.updateBusRoute);

// DELETE a bus route by ID
router.delete('/:id', busRouteController.deleteBusRoute);

module.exports = router;
