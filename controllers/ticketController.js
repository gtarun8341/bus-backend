const Ticket = require('../models/Ticket');

// Controller to create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const {  busRouteId, busDetails , isConfirmed, pickupLocation, dropLocation} = req.body;
    const userId=req.user._id
    const newTicket = new Ticket({
      userId,
      busRouteId,
      busDetails,
      isConfirmed,
      pickupLocation,
      dropLocation
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Error creating ticket' });
  }
};

// Controller to get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Error fetching tickets' });
  }
};

// Controller to get a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket by ID:', error);
    res.status(500).json({ error: 'Error fetching ticket' });
  }
};

exports.getTicketsByUserId = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userId is passed as a parameter
    const tickets = await Ticket.find({ userId: userId });
    console.log(tickets)

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: 'No tickets found for this user' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets by user ID:', error);
    res.status(500).json({ error: 'Error fetching tickets' });
  }
};

// Controller to update a ticket by ID
exports.updateTicketById = async (req, res) => {
  try {
    const { busDetails, seatNumber } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, {
      busDetails,
      seatNumber
    }, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket by ID:', error);
    res.status(500).json({ error: 'Error updating ticket' });
  }
};

// Controller to delete a ticket by ID
exports.deleteTicketById = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket by ID:', error);
    res.status(500).json({ error: 'Error deleting ticket' });
  }
};
