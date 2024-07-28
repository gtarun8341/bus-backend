const mongoose = require('mongoose');

const busDetailsSchema = new mongoose.Schema({
  // driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverProfile', required: true },
  busName: { type: String, required: true },
  busNumber: { type: String, required: true },
  busModel: { type: String, required: true },
  capacity: { type: Number, required: true },
});

const BusDetails = mongoose.model('BusDetails', busDetailsSchema);

module.exports = BusDetails;
