const express = require('express')
const spoon = require('../lib/spoonacularCall.js')
require('dotenv').config()
const spoonacularRouter = express.Router()

// Example: const recipes = await axios.get(`http://localhost:3000/find/title/Pepper`);
spoonacularRouter.get("/title/:title", async (req, res) => {
  try {
    const response = await spoon.searchTitle(req.params.title);
    res.json(response);
  } catch (err) {
      res.json(err);
  }
})

spoonacularRouter.get("/diet/:diet", async (req, res) => {
  try {
    const response = await spoon.searchDiet(req.params.diet);
    res.json(response);
  } catch (err) {
      res.json(err);
  }
})

spoonacularRouter.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const response = await spoon.searchCuisine(req.params.cuisine);
    res.json(response);
  } catch (err) {
      res.json(err);
  }
})

spoonacularRouter.get("/ingredients/:ingredients", async (req, res) => {
  try {
    const response = await spoon.searchIngredients(req.params.ingredients);
    res.json(response);
  } catch (err) {
      res.json(err);
  }
})

spoonacularRouter.get("/id/:id", async (req, res) => {
  try {
    const response = await spoon.getID(req.params.id);
    res.json(response);
  } catch (err) {
      res.json(err);
  }
})

// Example: const recipes = await axios.get('http://localhost:3000/find/random')
spoonacularRouter.get("/random", async (req, res) => {
  try {
    const response = await spoon.searchRandom();
    res.json(response);
  } catch (err) {
      res.json(err);
  }
})

module.exports = spoonacularRouter