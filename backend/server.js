//Load environment variables from .env file
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Routers
const userRouter = require('./routes/users.js');
const recipesRouter = require('./routes/recipes.js');
const spoonacularRouter = require('./routes/recipeLookup.js');

//Express app
const app = express();

//Middleware
app.use(express.json());    //Parse JSON bodies
app.use(cors());    //Enable Cross-Origin Resource Sharing

//Routes
app.use("/auth", userRouter);   //Use the user routes under /auth endpoint
app.use("/recipes", recipesRouter); //Use the recipe routes under /recipes endpoint
app.use("/find", spoonacularRouter) // Uses the recipe routes under /find endpoint

//Database connection
//Connect to MongoDB Atlas using the connection string from .env file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => { console.log('MongoDB Connected!'); })
    .catch((err) => { console.error('MongoDB connection error:', err); });

//Listening for requests
app.listen(process.env.PORT, () => {
    console.log('Server is listening on port', process.env.PORT);
});