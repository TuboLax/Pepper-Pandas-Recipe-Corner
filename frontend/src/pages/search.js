import './search.css';
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RecipeModalSpoon } from '../components/recipeModalSpoon.js';
import { userGetUserID } from '../hooks/useGetUserID';

const SaveRecipes = ( {recipeID, recipeTitle} ) => {
    const SpoonID = recipeID;
    const SpoonTitle = recipeTitle;
    const userID = userGetUserID();
    const [disable, setDisable] = useState(false); 

    const createAndSaveRecipe = async(SpoonID, userID) => {
        try {
            const response = await axios.get(`http://localhost:3000/find/id/${SpoonID}`);
            
            const ingredients = [];
            response.data.extendedIngredients.forEach(element => {
                ingredients.push(element.name)
            });
            const recipe = {
                title: response.data.title,
                image: response.data.image,
                servings: response.data.servings,
                readyInMinutes: response.data.readyInMinutes,
                sourceName: response.data.sourceName,
                sourceURL: response.data.sourceURL,
                spoonacularScore: response.data.spoonacularScore,
                cuisines: response.data.cuisines,
                diets: response.data.diets,
                instructions: response.data.instructions,
                extendedIngredients: ingredients,
                userOwner: userID,
            }
    
            const createdRecipe = await axios.post("http://localhost:3000/recipes", recipe);    // Creates the Spoonacular recipe locally
            await axios.put("http://localhost:3000/recipes", { recipeID: createdRecipe.data._id.toString(), userID });  // Saves to the user
            setDisable(true);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <button 
            className='search-save-button'
            onClick={() => createAndSaveRecipe(SpoonID, userID)}
            disabled={isRecipeSaved(SpoonTitle, userID) || disable}
        >
            {(isRecipeSaved(SpoonTitle, userID) || disable) ? "Saved" : "Save"}
        </button>
    )
}

let isRecipeSaved = (title, user) => {
    const [localRecipes, setLocalRecipes] = useState([]);
    let found = false;

    useEffect(() => {
        const checkLocal = async () => {
            try{
                const response = await axios.get("http://localhost:3000/recipes");
                setLocalRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        checkLocal();
    }, []);

    try {
        localRecipes.map((recipe) => {
            if (recipe.title === title && recipe.userOwner === user) {
                found = true;
            }
        })
    } catch (err) {
        console.log(err);
    }

    return found;
}

const GetRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchSpoon = async() => {
            try {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                
                const filter = urlParams.get('filter');
                const query = urlParams.get('query');

                let response;
                switch (filter) {
                    case 'title':
                        response = await axios.get(`http://localhost:3000/find/title/${query}`);
                        break;
                    case 'cuisine':
                        response = await axios.get(`http://localhost:3000/find/cuisine/${query}`);
                        break;
                    case 'diet':
                        response = await axios.get(`http://localhost:3000/find/diet/${query}`);
                        break;
                    case 'ingredients':
                        response = await axios.get(`http://localhost:3000/find/ingredients/${query}`);
                        break;
                    default:
                        break;
                }
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSpoon();
    }, []);

    return (
        <ul className='recipeList'>
            {recipes.map((recipe) => (
                <>
                <li key={recipe._id} className='recipeListItem'>
                    <div>
                        <h2 className='recipeListItemTitle'>{recipe.title}</h2>
                    </div>
                    <img src={recipe.image} alt={recipe.title} id="recipeImage" />
                    <RecipeModalSpoon
                        recipeID = {recipe.id}
                    />
                    <SaveRecipes 
                        recipeID = {recipe.id}
                        recipeTitle = {recipe.title}    
                    />
                </li>
                </>
            ))}
        </ul>
    )
}


export const Search = () => {

    return  <div className="container" style={{ paddingTop: '120px' }}>
    <header>
        <div className="logo-container">
            <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
        </div>
        <h1>Pepper's Findings</h1>
    </header>
        <div>
            <GetRecipes/>
        </div>
    <footer>
        <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
    </footer>
</div>
};