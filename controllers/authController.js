const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DriverProfile = require('../models/DriverProfile');
const config = require('../config');

exports.register = async (req, res) => {
    try {
      const { fullname, email, password, phoneNumber } = req.body;
  
      let driver = await DriverProfile.findOne({ email });
      if (driver) {
        console.log('Driver already registered:', email);
        return res.status(400).send({ error: 'Driver already registered.' });
      }
  
      driver = new DriverProfile({ fullname, email, password, phoneNumber });
      const salt = await bcrypt.genSalt(10);
      driver.password = await bcrypt.hash(password, salt);
      await driver.save();
  
      console.log('Driver registered successfully:', email);
      const token = jwt.sign({ _id: driver._id }, config.jwtSecret);
      res.send({ token });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send({ error: 'Server error' });
    }
  };
  

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await DriverProfile.findOne({ email });
    if (!driver) {
      return res.status(400).send({ error: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(password, driver.password);
    if (!validPassword) {
      return res.status(400).send({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ _id: driver._id }, config.jwtSecret);
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};
