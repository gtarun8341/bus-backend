const mongoose = require('mongoose'); // Add this line to import mongoose
const { DriverWallet } = require('../models/Wallet');
const { UserWallet } = require('../models/Wallet');
const stripe = require('stripe')('sk_test_51CVz59CmKJdoXRzt1zqYINdBWrVXuHZmYpb9hfhgQZNDZyoyPIPx83vDzIiNW8VoSJ0rLspm0SZB3fISD3sKpgn600ypFQFT8o'); // Replace with your Stripe secret key

exports.getDriverWallet = async (req, res) => {
  try {
    const wallet = await DriverWallet.findOne({ driverId: req.user._id });
    if (!wallet) {
      return res.status(404).send({ error: 'Wallet not found' });
    }
    res.send(wallet);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

// exports.addDriverTransaction = async (req, res) => {
//   try {
//     const { amount, type, description } = req.body;
//     let wallet = await DriverWallet.findOne({ driverId: req.user._id });

//     if (!wallet) {
//       wallet = new DriverWallet({ driverId: req.user._id, balance: 0, transactions: [] });
//     }

//     wallet.transactions.push({ amount, type, description });
//     if (type === 'credit') {
//       wallet.balance += amount;
//     } else if (type === 'debit') {
//       wallet.balance -= amount;
//     } else {
//       return res.status(400).send({ error: 'Invalid transaction type' });
//     }

//     await wallet.save();
//     res.send(wallet);
//   } catch (error) {
//     res.status(500).send({ error: 'Server error' });
//   }
// };

exports.addDriverTransaction = async (req, res) => {
  const { amount } = req.body;

  try {
    // Validate amount
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    // Update the user's wallet balance and record the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find user's wallet and update balance
      let driverWallet = await DriverWallet.findOne({ driverId: req.user._id }).session(session);

      if (!driverWallet) {
        driverWallet = new DriverWallet({ driverId: req.user._id, balance: 0, transactions: [] });
        await driverWallet.save({ session: session });
      }

      driverWallet = await DriverWallet.findOneAndUpdate(
        { driverId: req.user._id },
        {
          $inc: { balance: amount },
          $push: {
            transactions: {
              amount: amount,
              type: 'credit',
              description: 'Added money via Stripe payment',
            },
          },
        },
        { new: true, session: session }
      );

      // Log wallet update details
      console.log(`Wallet balance updated for user ${req.user._id}: +${amount} INR`);
      console.log('Updated User Wallet:', driverWallet);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ driverWallet });

    } catch (error) {
      // Rollback the transaction on error
      await session.abortTransaction();
      session.endSession();
      console.error('Error updating user wallet:', error);
      res.status(500).json({ error: 'Failed to update user wallet.' });
    }
  } catch (error) {
    console.error('Error in /updateWallet endpoint:', error);
    res.status(500).json({ error: 'Failed to update user wallet.' });
  }
};

exports.getUserWallet = async (req, res) => {
  try {
    const wallet = await UserWallet.findOne({ userId: req.user._id });
    if (!wallet) {
      return res.status(404).send({ error: 'Wallet not found' });
    }
    res.send(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};

// exports.addUserTransaction = async (req, res) => {
//   try {
//     const { amount, type, description } = req.body;
//     let wallet = await UserWallet.findOne({ userId: req.user._id });

//     if (!wallet) {
//       wallet = new UserWallet({ userId: req.user._id, balance: 0, transactions: [] });
//     }

//     wallet.transactions.push({ amount, type, description });
//     if (type === 'credit') {
//       wallet.balance += amount;
//     } else if (type === 'debit') {
//       wallet.balance -= amount;
//     } else {
//       return res.status(400).send({ error: 'Invalid transaction type' });
//     }

//     await wallet.save();
//     res.send(wallet);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Server error' });
//   }
// };

exports.addUserTransaction = async (req, res) => {
  const { amount } = req.body;

  try {
    // Validate amount
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    // Update the user's wallet balance and record the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find user's wallet and update balance
      let userWallet = await UserWallet.findOne({ userId: req.user._id }).session(session);

      if (!userWallet) {
        userWallet = new UserWallet({ userId: req.user._id, balance: 0, transactions: [] });
        await userWallet.save({ session: session });
      }

      userWallet = await UserWallet.findOneAndUpdate(
        { userId: req.user._id },
        {
          $inc: { balance: amount },
          $push: {
            transactions: {
              amount: amount,
              type: 'credit',
              description: 'Added money via Stripe payment',
            },
          },
        },
        { new: true, session: session }
      );

      // Log wallet update details
      console.log(`Wallet balance updated for user ${req.user._id}: +${amount} INR`);
      console.log('Updated User Wallet:', userWallet);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ userWallet });

    } catch (error) {
      // Rollback the transaction on error
      await session.abortTransaction();
      session.endSession();
      console.error('Error updating user wallet:', error);
      res.status(500).json({ error: 'Failed to update user wallet.' });
    }
  } catch (error) {
    console.error('Error in /updateWallet endpoint:', error);
    res.status(500).json({ error: 'Failed to update user wallet.' });
  }
};