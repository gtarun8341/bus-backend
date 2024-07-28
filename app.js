const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const authUserRoutes = require('./routes/authUserRoutes');
const driverProfileRoutes = require('./routes/driverProfileRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const busDetailsRoutes = require('./routes/busDetailsRoutes');
const walletRoutes = require('./routes/walletRoutes');
const tripRoutes = require('./routes/tripRoutes');
const busRouteRoutes = require('./routes/busRouteRoutes');
const issueRoutes = require('./routes/issueRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const busStopsRoutes = require('./routes/busStopsRoutes');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51CVz59CmKJdoXRzt1zqYINdBWrVXuHZmYpb9hfhgQZNDZyoyPIPx83vDzIiNW8VoSJ0rLspm0SZB3fISD3sKpgn600ypFQFT8o');
const bodyParser = require('body-parser');
const { UserWallet } = require('./models/Wallet');
const authMiddleware = require('./middleware/authMiddleware');
const reminderRoutes = require('./routes/reminderRoutes');
const WebSocket = require('ws');
const busLocationRoutes = require('./routes/busLocationRoutes');
const BusLocation = require('./models/BusLocation');

const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use("/stripe", express.raw({ type: "*/*" }));

app.use(express.json());
app.use(cors());

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/driver', driverProfileRoutes);
app.use('/api/issue', issueRoutes);

app.use('/api/wallet', walletRoutes);
app.use('/api/bus-location', busLocationRoutes);

app.use('/api/users/auth', authUserRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/reminders', reminderRoutes);

app.use('/api/busStops', busStopsRoutes);

app.use('/api/trips', tripRoutes);
app.use('/api/bus-details', busDetailsRoutes);
app.use('/api/bus-routes', busRouteRoutes);

app.post('/pay', authMiddleware, async (req, res) => {
  const { name, amount } = req.body;

  try {
    // Validate amount and payment_method
    if (!amount || !name) {
      return res.status(400).json({ message: "Amount and name are required" });
    }

    // Create PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert amount to cents if necessary
      currency: 'INR',
      payment_method_types: ['card'],
      metadata: { name },
    });

    // Log the paymentIntent and client_secret (for debugging purposes)
    console.log('Payment Intent:', paymentIntent);

    // Return clientSecret to the client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      message: 'Payment Intent created successfully.',
    });

  } catch (error) {
    console.error('Error creating Payment Intent:', error);
    res.status(500).send({ error: 'Failed to create Payment Intent.' });
  }
});

app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});


const PORT = config.port || 5000;

const server =app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.action === 'subscribe' && data.busId) {
      clients.set(ws, data.busId);
      console.log(`Client subscribed to busId: ${data.busId}`);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

app.post('/api/update-location', async (req, res) => {
  const { busId, latitude, longitude } = req.body;

  // Log incoming request data
  console.log(`Received location update: busId=${busId}, latitude=${latitude}, longitude=${longitude}`);

  try {
    // Find if a location record already exists for the given busId
    let busLocation = await BusLocation.findOne({ busId });

    if (busLocation) {
      // If it exists, update the latitude, longitude, and updatedAt fields
      busLocation.latitude = latitude;
      busLocation.longitude = longitude;
      busLocation.updatedAt = new Date(); // Update the updatedAt field with the current date and time
    } else {
      // If it does not exist, create a new record
      busLocation = new BusLocation({ busId, latitude, longitude, updatedAt: new Date() });
    }

    // Save the bus location (update or create)
    await busLocation.save();

    // Log successful save
    console.log('Bus location saved successfully');

    // Broadcast location update to subscribed WebSocket clients
    clients.forEach((subscribedBusId, client) => {
      if (client.readyState === WebSocket.OPEN && subscribedBusId === busId) {
        client.send(JSON.stringify({ busId, latitude, longitude, updatedAt: busLocation.updatedAt }));
      }
    });

    // Log broadcast completion
    console.log('Location update broadcasted to WebSocket clients');

    // Send success response
    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    // Log error
    console.error('Error updating bus location:', error);

    // Send error response
    res.status(500).json({ message: 'Internal server error' });
  }
});