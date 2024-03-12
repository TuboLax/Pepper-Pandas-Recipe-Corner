require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouter = require('./routes/users.js');

//express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//path for app
app.use("/auth", userRouter);

/*****  NOT NEEDED - DELETE LATER  *****/
//get for postman - Lists on webpage
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app. I am Pepper Panda'});
})
/*****  NOT NEEDED - DELETE LATER  *****/

//database connection - single statement
mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log('MongoDB Connected!')})
    .catch((err) => {console.log(err)});

//Listening for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
})