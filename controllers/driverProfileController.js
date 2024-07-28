const DriverProfile = require('../models/DriverProfile');

exports.getDriverProfile = async (req, res) => {
  try {
    const driver = await DriverProfile.findById(req.user._id);
    if (!driver) {
      return res.status(404).send({ error: 'Driver not found' });
    }
    res.send(driver);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Server error' });
  }
};


exports.getDriverById = async (req, res) => {
  try {
    console.log(req.params.id)
    const driver = await DriverProfile.findById(req.params.id);
    if (!driver) {
      return res.status(404).send({ error: 'Driver not found' });
    }
    res.send(driver);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Server error' });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await DriverProfile.find();
    res.send(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};

exports.updateDriverProfile = async (req, res) => {
  try {
    const updates = req.body;
    const driver = await DriverProfile.findByIdAndUpdate(req.user._id, updates, { new: true });
    if (!driver) {
      return res.status(404).send({ error: 'Driver not found' });
    }
    res.send(driver);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};
