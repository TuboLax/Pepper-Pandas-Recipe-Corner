require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//get for postman - Lists on webpage
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

//database connection
mongoose.connect("mongodb+srv://saccodeproject:TermPeppa89@recipes.v3su4qy.mongodb.net/Recipes?retryWrites=true&w=majority&appName=Recipes");

//Listening for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})
