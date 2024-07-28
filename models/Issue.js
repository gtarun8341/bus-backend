const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverProfile', required: true },
  busNumber:{ type: Number, required: true },
  issueDescription: { type: String, required: true },
  reportedAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
