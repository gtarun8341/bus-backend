// Example import in a controller
const BusRoute = require('../models/BusRoute'); // Ensure the path is correct relative to your current file

// Get all bus routes
exports.getAllBusRoutes = async (req, res) => {
  try {
    const busRoutes = await BusRoute.find();
    res.json(busRoutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single bus route
exports.getBusRouteById = async (req, res) => {
  console.log(req.params.id)
  try {
    const busRoute = await BusRoute.findById(req.params.id);
    if (!busRoute) {
      return res.status(404).json({ message: 'Bus route not found' });
    }
    res.json(busRoute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Route to get bus route details by bus ID
// Route to get bus route details by bus ID
exports.getRouteByBusId = async (req, res) => {
  const busId = req.params.busId;
  console.log('Requested busId:', busId); // Log the requested busId

  try {
    const busRoutes = await BusRoute.find({ busId }).populate('checkpoints'); // Populate checkpoints if needed
    console.log('Fetched bus routes:', busRoutes); // Log fetched bus routes
    res.json(busRoutes);
  } catch (error) {
    console.error('Error fetching bus route data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a bus route
exports.createBusRoute = async (req, res) => {
  const busRoute = new BusRoute({
    tripId: req.body.tripId,
    busId: req.body.busId,
    origin: req.body.origin,
    destination: req.body.destination,
    checkpoints: req.body.checkpoints,
    currentLocation: req.body.currentLocation,
    markerColor: req.body.markerColor,
  });

  try {
    const newBusRoute = await busRoute.save();
    res.status(201).json(newBusRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a bus route
exports.updateBusRoute = async (req, res) => {
  try {
    const updatedBusRoute = await BusRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBusRoute) {
      return res.status(404).json({ message: 'Bus route not found' });
    }
    res.json(updatedBusRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a bus route
exports.deleteBusRoute = async (req, res) => {
  try {
    const deletedBusRoute = await BusRoute.findByIdAndDelete(req.params.id);
    if (!deletedBusRoute) {
      return res.status(404).json({ message: 'Bus route not found' });
    }
    res.json({ message: 'Bus route deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
