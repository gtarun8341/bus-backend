const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverProfile', required: true },
  busRouteId: { type: mongoose.Schema.Types.ObjectId, ref: 'BusRoute', required: true },
  cost: { type: Number, required: true }, // Added cost field
  status: { type: String, enum: ['not started', 'in progress', 'completed', 'cancelled'], default: 'not started' },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
