const BusLocation = require('../models/BusLocation');

const getBusLocation = async (req, res) => {
  try {
    const { busId } = req.params;
    const busLocation = await BusLocation.findOne({ busId }).sort({ updatedAt: -1 }).exec();
    if (busLocation) {
      res.json(busLocation);
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBusLocation,
};
