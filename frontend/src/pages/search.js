import './search.css';
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RecipeModalSpoon } from '../components/recipeModalSpoon.js';
import { RecipeModalLocal } from '../components/recipeModalLocal.js';
import { userGetUserID } from '../hooks/useGetUserID';

let ALTERNATE;

const SaveSpoonacular = ( {recipeID, recipeTitle} ) => {
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

    let isSpoonSaved = (title, user) => {
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

    return (
        <button 
            className='search-save-button'
            onClick={() => createAndSaveRecipe(SpoonID, userID)}
            disabled={isSpoonSaved(SpoonTitle, userID) || disable}
        >
            {(isSpoonSaved(SpoonTitle, userID) || disable) ? "Saved" : "Save"}
        </button>
    )
}

const SaveLocal = ( {recipeID} ) => {
    const userID = userGetUserID();
    const [savedRecipes, setSavedRecipes] = useState([]);
    
    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSavedRecipe();
    }, [])

    const save = async() => {
        try {
            const response = await axios.put("http://localhost:3000/recipes", { recipeID, userID });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err)
        }
    }

    const isLocalSaved = () => {
        return savedRecipes.includes(recipeID);
    }

    return (
        <button
            onClick={() => save()}
            disabled={isLocalSaved() }
        >
            {(isLocalSaved() ) ? "Saved" : "Save"}
        </button>
    )
};

const GetRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    const type = urlParams.get('type');
    const filter = urlParams.get('filter');
    const query = urlParams.get('query');

    let temp;
    let tempArray = [];

    useEffect(() => {
        const fetchSpoon = async() => {
            try {
                switch (filter) {
                    case 'title':
                        temp = await axios.get(`http://localhost:3000/find/title/${query}`);
                        break;
                    case 'cuisine':
                        temp = await axios.get(`http://localhost:3000/find/cuisine/${query}`);
                        break;
                    case 'diet':
                        temp = await axios.get(`http://localhost:3000/find/diet/${query}`);
                        break;
                    case 'ingredients':
                        temp = await axios.get(`http://localhost:3000/find/ingredients/${query}`);
                        break;
                    default:
                        break;
                }
                setRecipes(temp.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchLocal = async() => {
            const response = await axios.get("http://localhost:3000/recipes");
            temp = response.data;
            try {
                switch (filter) {
                    case 'title':
                        // First loop that goes through the local recipes
                        temp.map((local) => {
                            if(local.title.toLowerCase().includes(query.toLowerCase())) {
                                tempArray.push(local);
                            }
                        })
                        break;
                    case 'cuisine':
                        let formatCuisine;

                        // First loop that goes through the local recipes
                        temp.map((local) => {
                            // Second loop that goes through the cuisines parameter
                            local.cuisines.forEach(cuisine => {
                                // Checks if the cuisine is empty
                                if (cuisine != null && cuisine != "") {
                                    formatCuisine = cuisine.replace(" ", "").toLowerCase();
                                    if (formatCuisine.includes(query.replace(" ", "").toLowerCase())) {
                                        tempArray.push(local);
                                    }
                                }
                            })
                        })
                        break;
                    case 'diet':
                        let formatDiet;

                        // First loop that goes through the local recipes
                        temp.map((local) => {
                            // Second lood that goes through the diets parameter
                            local.diets.forEach(diet => {
                                // Checks if the diet is empty
                                if (diet != null && diet != "") {
                                    formatDiet = diet.replace(" ", "").toLowerCase();
                                    if(formatDiet.includes(query.replace(" ", "").toLowerCase())) {
                                        tempArray.push(local);
                                    }
                                }

                            });

                        })
                    case 'ingredients':
                        const formatArray = (query.split(",")); // Breaks the query into individual strings that are put into an array
                        let formatIngredient; 

                        // First loop that goes through the local recipes
                        temp.map((local) => {
                            // Second loop that goes through the ingredients of the local recipes
                            local.extendedIngredients.forEach(ingredient => {
                                formatIngredient = ingredient.toLowerCase(); 
                                
                                // Third loop that goes through the query array and checks if it is there
                                formatArray.forEach(query => {
                                    if(formatIngredient.includes(query.trim())) {
                                        // Checks if the recipe is already added to the array
                                        if (!tempArray.includes(local)) {
                                            tempArray.push(local)
                                        }
                                        
                                    }
                                }) 

                            })
                        })
                        break;
                    default:
                        break;
                }
                setRecipes(tempArray);
            } catch(err) {
                console.log(err)
            }
        }

        switch (type) {
            case 'local':
                ALTERNATE = true;
                fetchLocal();
                break;
            case 'spoon':
                ALTERNATE = false;
                fetchSpoon();
                break;
            default:
                break;
        }
    }, []);

    return (
        <ul className='recipeList'>
            {recipes.map((recipe) => (
                <>
                <li key={recipe._id} className='recipeListItem'>
                    <div>
                        <h2 className='recipeListItemTitle'>{recipe.title}</h2>
                    </div>
                    <img src={recipe.image} alt={recipe.title} id="recipeImage" className='search-recipe-image'/>
                    {(ALTERNATE) ? (<RecipeModalLocal recipeKey = {recipe}/>) : (<RecipeModalSpoon recipeID = {recipe.id}/>)}
                    {(ALTERNATE) ? (<SaveLocal recipeID = {recipe._id}/>) : (<SaveSpoonacular 
                        recipeID = {recipe.id}
                        recipeTitle = {recipe.title}    
                    />)}
                    
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