const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, issueController.reportIssue);
router.get('/', authMiddleware, issueController.getIssues);
router.put('/resolve', authMiddleware, issueController.resolveIssue);

module.exports = router;
