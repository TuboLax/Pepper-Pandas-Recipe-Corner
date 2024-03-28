//This file allows us to make spoonacular calls without all this boilerplate. Right now they are set to give 5 results, but that number is arbitrary. We can also expand this easily to make for better calls in the future.

require('dotenv').config()
const axios = require('axios')

exports.getID = async function(id){
     response = axios.get('https://api.spoonacular.com/recipes/' + id + '/information?number=5&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data)
        .catch(err => console.error(err))
        return response
        //This function will return the recipe from spoonacular with the given id.
}

exports.searchTitle = async function(title){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?query=' + title + '&number=5&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data)
        .catch(err => console.error(err))
        return response
        //This function will return 5 recipes from spoonacular which have titles that match the search.
}

exports.searchDiet = async function(diet){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?diet=' + diet + '&number=5&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data)
        .catch(err => console.error(err))
        return response
        //This function will return 5 recipes from spoonacular that fit a given diet.
}

exports.searchCuisine = async function(cuisine){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?cuisine=' + cuisine + '&number=5&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data)
        .catch(err => console.error(err))
        return response
        //This function will return 5 recipes from spoonacular that are from a specified cuisine.
}

exports.searchIngredients = async function(ingredients){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?ingredients' + ingredients + '&number=5&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data)
        .catch(err => console.error(err))
        return response
        //This function will return 5 recipes from spoonacular that have the given ingredients.
}

exports.searchIngredientsExcluded = async function(ingredientsExluded){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?ingredients' + ingredientsExluded + '&number=5&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data)
        .catch(err => console.error(err))
        return response
        //This function will return 5 recipes from spoonacular that DON'T have the given ingredients.
}