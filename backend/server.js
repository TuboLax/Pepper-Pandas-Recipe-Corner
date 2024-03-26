require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routes/users.js');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", userRouter);

// Database connection
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MongoDB URI is not defined in the environment.');
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Listening for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is listening on port', port);
});