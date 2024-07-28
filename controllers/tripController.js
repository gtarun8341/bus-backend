const Trip = require('../models/Trip');

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single trip
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTripByBusRouteId = async (req, res) => {
  try {
    const trip = await Trip.findOne({ busRouteId: req.params.busRouteId });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getTripsByDriverId = async (req, res) => {
  try {console.log(req.params)
      const trips = await Trip.find({ driverId: req.params.driverId }).populate('busRouteId');
      if (trips.length === 0) {
          return res.status(404).json({ message: 'No trips found for this driver' });
      }
      res.json(trips);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Create a trip
exports.createTrip = async (req, res) => {
  const trip = new Trip({
    driverId: req.body.driverId,
    busRouteId: req.body.busRouteId,
    cost: req.body.cost,
    status: 'not started', // Default status set to 'not started'
  });

  try {
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a trip
exports.updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
