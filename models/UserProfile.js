const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const userProfile = mongoose.model('userProfile', userProfileSchema);

module.exports = userProfile;
