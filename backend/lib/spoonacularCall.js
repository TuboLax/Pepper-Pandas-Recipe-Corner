// This file allows us to make spoonacular calls without all this boilerplate. 
// Right now they are set to give 10 results, but that number is arbitrary. We can also expand this easily to make for better calls in the future.

require('dotenv').config()
const axios = require('axios')

exports.getID = async function(id){
     response = axios.get('https://api.spoonacular.com/recipes/' + id + '/information?apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data)
        .catch(err => console.error(err))
        return response
}

exports.searchTitle = async function(title){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?query=' + title + '&number=9&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data.results)
        .catch(err => console.error(err))
        return response
}

exports.searchDiet = async function(diet){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?diet=' + diet + '&number=9&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data.results)
        .catch(err => console.error(err))
        return response
}

exports.searchCuisine = async function(cuisine){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?cuisine=' + cuisine + '&number=9&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data.results)
        .catch(err => console.error(err))
        return response
}

exports.searchIngredients = async function(ingredients){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?includeIngredients=' + ingredients + '&number=9&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data.results)
        .catch(err => console.error(err))
        return response
}

exports.searchIngredientsExcluded = async function(ingredientsExluded){
    response = axios.get('https://api.spoonacular.com/recipes/complexSearch?excludeIngredients=' + ingredientsExluded + '&number=9&apiKey=' + process.env.SPOONACULARAPI)
        .then(response => response.data.results)
        .catch(err => console.error(err))
        return response
}

exports.searchRandom = async function() {
    response = axios.get('https://api.spoonacular.com/recipes/random?apiKey=' + process.env.SPOONACULARAPI + '&number=3')
        .then(response => response.data.recipes)
        .catch(err => console.error(err))
        return response
}
