const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/driver', authMiddleware, walletController.getDriverWallet);
router.post('/updateDriverWallet', authMiddleware, walletController.addDriverTransaction);
router.get('/user', authMiddleware, walletController.getUserWallet);
router.post('/updateUserWallet', authMiddleware, walletController.addUserTransaction);

module.exports = router;
