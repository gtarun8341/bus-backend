const BusStop = require('../models/busStop');
const BusDetails = require('../models/BusDetails');

// Get all bus stops
const getAllBusStops = async (req, res) => {
    try {
      const busStops = await BusStop.find();
      res.json(busStops);
    } catch (err) {
      console.error("Error fetching bus stops:", err.message);
      res.status(500).json({ message: err.message });
    }
  };

// Get one bus stop
const getBusStop = async (req, res) => {
    try {
      const busStop = await BusStop.findById(req.params.id).populate('buses');
      if (!busStop) {
        return res.status(404).json({ message: 'Bus stop not found' });
      }
      console.log(busStop)
      res.json(busStop);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Create a bus stop
const createBusStop = async (req, res) => {
    const { stationName, coordinate, stationImage, distance, time} = req.body;
  
    const busStop = new BusStop({
      stationName,
      coordinate,
      stationImage,
      distance,
      time
    });
  
    try {
      const newBusStop = await busStop.save();
      res.status(201).json(newBusStop);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

  const updateBusStop = async (req, res) => {
    const { stationName, coordinate, stationImage, distance, time, buses, routes } = req.body;
    
    try {
      const busStop = await BusStop.findById(req.params.id);
    
      if (!busStop) {
        return res.status(404).json({ message: 'Bus stop not found' });
      }
    
      // Update bus stop details if provided in the request
      if (stationName) {
        busStop.stationName = stationName;
      }
      if (coordinate) {
        busStop.coordinate = coordinate;
      }
      if (stationImage) {
        busStop.stationImage = stationImage;
      }
      if (distance) {
        busStop.distance = distance;
      }
      if (time) {
        busStop.time = time;
      }
    
      // Update buses associated with the bus stop (allow multiple buses to be added)
      if (buses && buses.length > 0) {
        // Validate if all provided bus IDs are valid
        const validBusIds = await BusDetails.find({ _id: { $in: buses } }).distinct('_id');
        if (validBusIds.length !== buses.length) {
          return res.status(400).json({ message: 'Invalid bus ID(s) provided' });
        }
        busStop.buses = buses; // Set the array of bus IDs
      }
    
      // Update routes associated with the bus stop
      if (routes && routes.length > 0) {
        // Validate if all provided route IDs are valid
        const validRouteIds = await BusRoute.find({ _id: { $in: routes } }).distinct('_id');
        if (validRouteIds.length !== routes.length) {
          return res.status(400).json({ message: 'Invalid route ID(s) provided' });
        }
        busStop.routes = routes;
      }
    
      const updatedBusStop = await busStop.save();
      res.json(updatedBusStop);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  };
  

// Delete a bus stop
const deleteBusStop = async (req, res) => {
  try {
    const busStop = await BusStop.findById(req.params.id);
    if (busStop == null) {
      return res.status(404).json({ message: 'Cannot find bus stop' });
    }

    await busStop.remove();
    res.json({ message: 'Deleted Bus Stop' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBusStops,
  getBusStop,
  createBusStop,
  updateBusStop,
  deleteBusStop
};
