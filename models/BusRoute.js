const mongoose = require('mongoose');

const CheckpointSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  routeName: { type: String, required: true },
});

const busRouteSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'BusDetails', required: true },
  origin: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    routeName: { type: String, required: true },
  },
  destination: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    routeName: { type: String, required: true },
  },
  checkpoints: [CheckpointSchema],
  currentLocation: {
    latitude: Number,
    longitude: Number,
  },
  markerColor: { type: String },
});

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute; // Corrected export statement
