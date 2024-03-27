require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users.js');

// Router for Spoonacular API access
const spoonRouter = require('./routes/spoon.js');

//express app
const app = express()

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use("/auth", userRouter); // Use the user routes under /auth endpoint

// Start to the path for Spoonacular API access
app.use("/recipes", spoonRouter);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to MongoDB Atlas using the connection string from .env file
    .then(() => { console.log('MongoDB Connected!'); })
    .catch((err) => { console.error('MongoDB connection error:', err); });

// Listening for requests
app.listen(process.env.PORT, () => {
    console.log('Server is listening on port', process.env.PORT);
});
