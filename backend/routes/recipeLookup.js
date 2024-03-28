const express = require('express')
const jwt = require('jsonwebtoken')
const spoon = require('../lib/spoonacularCall.js')
const axios = require('axios')
require('dotenv').config()

const recipeRouter = express.Router()

recipeRouter.post("/getSpoon", async (req, res) => {    //This route was just to get the code developed before I moved it into the module file
    const data = req.body
     await axios.get('https://api.spoonacular.com/recipes/' + data.id + '/information?apiKey=' + process.env.SPOONACULARAPI)
        .then(response => {
            // console.log(response)
            res.status(200).json({
                success:true,
                result:response.data
              })
        })
        .catch(err => console.error(err))
})

recipeRouter.post("/getSpoon2", async (req, res) => {   //This route demonstrates how to use the spoonacularCall module.
  const data = req.body
  response = await spoon.searchTitle(data.searchTitle(data.search)) 
  res.json(response)
})

module.exports = recipeRouter

//DO NOT USE THIS
//This file serves as an example of how to use the spoonacularCall module