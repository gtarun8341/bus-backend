const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new ticket
router.post('/', authMiddleware, ticketController.createTicket);

// Route to get all tickets
router.get('/', authMiddleware, ticketController.getAllTickets);

router.get('/user', authMiddleware, ticketController.getTicketsByUserId);

// Route to get a ticket by ID
router.get('/:id', authMiddleware, ticketController.getTicketById);

// Route to update a ticket by ID
router.put('/:id', authMiddleware, ticketController.updateTicketById);

// Route to delete a ticket by ID
router.delete('/:id', authMiddleware, ticketController.deleteTicketById);

module.exports = router;
