const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a bus stop
const busStopSchema = new Schema({
  stationName: {
    type: String,
    required: true
  },
  coordinate: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  stationImage: {
    type: String, // Assuming the image is stored as a URL
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  buses: [{
    type: Schema.Types.ObjectId,
    ref: 'BusDetails' // Reference to BusDetails model
  }],
  routes: [{
    type: Schema.Types.ObjectId,
    ref: 'BusRoute' // Reference to BusRoute model
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema and export it
const BusStop = mongoose.model('BusStop', busStopSchema);

module.exports = BusStop;
