const BusDetails = require('../models/BusDetails');

// Get all bus details
exports.getAllBusDetails = async (req, res) => {
  try {
    const busDetails = await BusDetails.find();
    res.json(busDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single bus detail
exports.getBusDetailById = async (req, res) => {
  console.log(req.params.id)
  try {
    const busDetail = await BusDetails.findById(req.params.id);
    if (!busDetail) {
      return res.status(404).json({ message: 'Bus detail not found' });
    }
    res.json(busDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a bus detail
exports.createBusDetail = async (req, res) => {
  const busDetail = new BusDetails({
    busName: req.body.busName,
    busNumber: req.body.busNumber,
    busModel: req.body.busModel,
    capacity: req.body.capacity,
  });

  try {
    const newBusDetail = await busDetail.save();
    res.status(201).json(newBusDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a bus detail
exports.updateBusDetail = async (req, res) => {
  try {
    const updatedBusDetail = await BusDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBusDetail) {
      return res.status(404).json({ message: 'Bus detail not found' });
    }
    res.json(updatedBusDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a bus detail
exports.deleteBusDetail = async (req, res) => {
  try {
    const deletedBusDetail = await BusDetails.findByIdAndDelete(req.params.id);
    if (!deletedBusDetail) {
      return res.status(404).json({ message: 'Bus detail not found' });
    }
    res.json({ message: 'Bus detail deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
