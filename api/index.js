const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: ['http://localhost:3000'], // add your allowed origins here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// MongoDB connection (reuse connection if already connected)
const mongoUri = 'mongodb+srv://saikirandasari04:mRCCHvIkwSiRdU8x@chatapp.md9qa.mongodb.net';

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

connectToDatabase().catch(err => {
  console.error('MongoDB connection error:', err);
});

// Import your route handlers
const Auth = require("../routes/Auth");
const Loan = require("../routes/Loan");

// Use routes
app.use(Auth);
app.use(Loan);

// Export the app wrapped with serverless-http
module.exports = serverless(app);