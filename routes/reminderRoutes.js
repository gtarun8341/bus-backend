// routes/reminderRoutes.js

const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const authMiddleware=require('../middleware/authMiddleware');

router.post('/',authMiddleware, reminderController.saveReminder);
router.get('/',authMiddleware, reminderController.getReminder);
router.delete('/:id',authMiddleware, reminderController.deleteReminder);

module.exports = router;
