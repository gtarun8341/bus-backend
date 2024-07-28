const mongoose = require('mongoose');

const busLocationSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'BusDetails', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field with the current date and time before saving
busLocationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const BusLocation = mongoose.model('BusLocation', busLocationSchema);

module.exports = BusLocation;
