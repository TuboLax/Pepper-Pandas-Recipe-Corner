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

app.use("/auth", userRouter);

//get for postman - Lists on webpage
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app!!!'});
})

//database connection
mongoose.connect("mongodb+srv://saccodeproject:TermPeppa89@recipeapp.avdvskp.mongodb.net/recipeapp?retryWrites=true&w=majority&appName=recipeapp");

//Listening for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
})
