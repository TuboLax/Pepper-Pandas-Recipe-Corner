// TODO: Move the queries to be in the search bar 

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Home = () => {

    // React’s “useState” to store the recipes in variables (recipes and setRecipes) from Spoonacular's database
    const [recipes, setRecipes] = useState([]);

    // React’s “useEffect” can be used to create an API request to Spoonacular
    useEffect(() => {
        // Inside of “useEffect” an async function can be created called “fetchRecipe“ that 
        // can get the recipe from Spoonacular’s API based on the title, diet, cuisine, ingredients, or randomized.
        const fetchRecipe = async() => {
            try {
                // Query parameters
                const number = 2;  

                // Search Recipes by Title
                const title = "Pepper";

                // Spoonacular API request
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=54b0920983af4a289b3fdf0383bf01eb&query=${title}&number=${number}`);
                
                // Stores the results part
                setRecipes(response.data.results);

                // Search by Diet
                // const diet = "vegetarian";
                // const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=54b0920983af4a289b3fdf0383bf01eb&diet=${diet}&number=${number}`);
                // setRecipes(response.data.results);

                // Search by Cuisine
                // const cuisine = "italian";
                // const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=54b0920983af4a289b3fdf0383bf01eb&cuisine=${cuisine}&number=${number}`);
                // setRecipes(response.data.results);

                // Random request
                // const response = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=54b0920983af4a289b3fdf0383bf01eb&number=${number}");
                // setRecipes(response.data.recipes);

                // // Search by ingredients
                // const ingred = "apples,flour,sugar";
                // const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=54b0920983af4a289b3fdf0383bf01eb&ingredients=${ingred}&number=${number}`);
                // setRecipes(response.data);
            } catch(err) {
                console.error(err);
            }
        };
        // Gets the recipes from Spoonacular and stores them
        fetchRecipe();
    }, []);

    return (
        <div> 
            <h1> Recipes</h1>
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div>
                                <h2>{recipe.title}</h2>
                            </div>
                            <img src={recipe.image} alt={recipe.title} />
                        </li>
                    ))}
        </ul>
        </div>  
    );
};