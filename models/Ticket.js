const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  busRouteId: { type: mongoose.Schema.Types.ObjectId, ref: 'BusRoute', required: true },
  busDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'BusDetails', required: true }, // Reference to BusDetails
  // seatNumber: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  isConfirmed: { type: Boolean, default: false },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
