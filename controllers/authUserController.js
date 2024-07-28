const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/UserProfile');
const config = require('../config');

exports.register = async (req, res) => {
    console.log(req.body)

    try {
      const { fullname, email, password, phoneNumber } = req.body;
  
      let user = await UserProfile.findOne({ email });
      if (user) {
        console.log('user already registered:', email);
        return res.status(400).send({ error: 'user already registered.' });
      }
  
      user = new UserProfile({ fullname, email, password, phoneNumber });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
  
      console.log('user registered successfully:', email);
      const token = jwt.sign({ _id: user._id }, config.jwtSecret);
      res.send({ token });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send({ error: 'Server error' });
    }
  };
  

exports.login = async (req, res) => {
    console.log(req.body)

  try {
    const { email, password } = req.body;

    const user = await UserProfile.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};
