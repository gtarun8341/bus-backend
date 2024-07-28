const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, userProfileController.getUserProfile);
router.put('/', authMiddleware, userProfileController.updateUserProfilee);

module.exports = router;
