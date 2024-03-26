const axios = require('axios');
const express = require('express');
const spoonRouter = express.Router();

// Spoonacular API access by title
// example: http://localhost:3000/recipes/getTitle/Pepper/2
// Using Postman and a get request
spoonRouter.get("/getTitle/:recipeTitle/:number", async (req, res) => {
    // Makes an API request for Spoonacular
    // Be sure to set an API_KEY in the .env file
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${req.params.recipeTitle}&number=${req.params.number}`);
    
    // Returns the results section of the json file
    res.json(response.data.results); 
});

// Spoonacular API access by cuisine
// example: http://localhost:3000/recipes/getCuisine/Italian/2
// Using Postman and a get request
spoonRouter.get("/getCuisine/:recipeCuisine/:number", async (req, res) => {
    // Makes an API request for Spoonacular
    // Be sure to set an API_KEY in the .env file
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&cuisine=${req.params.recipeCuisine}&number=${req.params.number}`);
    
    // Returns the results section of the json file
    res.json(response.data.results); 
});

// Spoonacular API access by diet
// example: http://localhost:3000/recipes/getDiet/vegetarian/2
// Using Postman and a get request
spoonRouter.get("/getDiet/:recipeDiet/:number", async (req, res) => {
    // Makes an API request for Spoonacular
    // Be sure to set an API_KEY in the .env file
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&diet=${req.params.recipeDiet}&number=${req.params.number}`);
    
    // Returns the results section of the json file
    res.json(response.data.results); 
});

// Spoonacular API access by ingredients
// example: http://localhost:3000/recipes/getIngredients/apples,flour,sugar/2
// Using Postman and a get request
spoonRouter.get("/getIngredients/:recipeIngredients/:number", async (req, res) => {
    // Makes an API request for Spoonacular
    // Be sure to set an API_KEY in the .env file
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${req.params.recipeIngredients}&number=${req.params.number}`);
    
    // Returns the data section of the json file
    res.json(response.data); 
});

// Spoonacular API access to get recipe information
// example: http://localhost:3000/recipes/getInfo/716429
// Using Postman and a get request
spoonRouter.get("/getInfo/:recipeIDs", async (req, res) => {
    // Makes an API request for Spoonacular
    // Be sure to set an API_KEY in the .env file
    const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${req.params.recipeIDs}&apiKey=${process.env.API_KEY}`);
    
    // Returns the data section of the json file
    res.json(response.data); 
});

module.exports = spoonRouter;