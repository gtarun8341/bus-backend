const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  description: { type: String },
});

const driverWalletSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverProfile', required: true },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

const userWalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

const DriverWallet = mongoose.model('DriverWallet', driverWalletSchema);
const UserWallet = mongoose.model('UserWallet', userWalletSchema);

module.exports = { DriverWallet, UserWallet };
