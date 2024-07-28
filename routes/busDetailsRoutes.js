const express = require('express');
const router = express.Router();
const busDetailsController = require('../controllers/busDetailsController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all bus details
router.get('/', busDetailsController.getAllBusDetails);

// GET a single bus detail by ID
router.get('/:id', busDetailsController.getBusDetailById);

// POST create a new bus detail
router.post('/', busDetailsController.createBusDetail);

// PUT update a bus detail by ID
router.put('/:id', busDetailsController.updateBusDetail);

// DELETE a bus detail by ID
router.delete('/:id', busDetailsController.deleteBusDetail);

module.exports = router;
