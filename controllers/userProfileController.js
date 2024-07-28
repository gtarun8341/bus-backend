const UserProfile = require('../models/UserProfile');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

exports.updateUserProfilee = async (req, res) => {
  try {
    const updates = req.body;
    const user = await UserProfile.findByIdAndUpdate(req.user._id, updates, { new: true });
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};
