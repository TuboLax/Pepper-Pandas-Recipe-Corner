import './search.css';
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RecipeModalSpoon } from '../components/Modals/recipeModalSpoon.js';
import { RecipeModalLocal } from '../components/Modals/recipeModalLocal.js';
import { userGetUserID } from '../hooks/useGetUserID';
import GroceryList from '../components/grocerylist.js';

let ALTERNATE;

export const SaveSpoonacular = ( {recipeID, recipeTitle} ) => {
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
            alert("Spoonacular Recipe Saved!");
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
            alert("Local Recipe Saved!");
        } catch (err) {
            console.log(err)
        }
    }

    const isLocalSaved = () => {
        return savedRecipes.includes(recipeID);
    }

    return (
        <button className='search-save-button'
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
                        // First loop that goes through the local recipes
                        temp.map((local) => {
                            let tempString = local.cuisines.toString().toLowerCase()    // Converts the cuisines array to a String and lowercases it
                            // Checks if the query (lowercased) appears in the cuisines' String
                            if (tempString.includes(query.replace(" ", "").toLowerCase())) {
                                tempArray.push(local);
                            }
                        })
                        break;
                    case 'diet':
                        // First loop that goes through the local recipes
                        temp.map((local) => {
                            let tempString = local.diets.toString().replace(" ", "").toLowerCase()
                            if (tempString.includes(query.replace(" ", "").toLowerCase())) {
                                tempArray.push(local)
                            }
                        })
                        break;
                    case 'ingredients':
                        const formatQuery = query.toLowerCase().split(",")  // Query turns into an array 
                                                
                        // First loop through all of the local recipes
                        temp.map((local) => {
                            let tempLocalIngredients = local.extendedIngredients.toString().replace(" ", "");   // Converts the ingredients to a String
                            // Second loop to check if each query appears in the ingredients
                            formatQuery.forEach(queryIngredient => {
                                if(tempLocalIngredients.includes(queryIngredient) && !tempArray.includes(local)) {
                                    tempArray.push(local);
                                }
                            });
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
console.log(recipes);
    return (
        <ul className='recipeList'>
            {recipes.map((recipe) => (
                <>
                <li key={recipe._id} className='recipeListItem'>
                    <div>
                        <h2 className='recipeListItemTitle'>{recipe.title}</h2>
                    </div>
                    <div className='recImg'>
                        <img src={recipe.image} alt={recipe.title} className='search-recipe-image'/>
                    </div>
                        <div className='modalBG'>
                            {(ALTERNATE) ? (<RecipeModalLocal recipeKey = {recipe}/>) : (<RecipeModalSpoon recipeID = {recipe.id}/>)}
                        </div>
                        <br></br>
                        <div className='saveBG'>
                            {(ALTERNATE) ? (<SaveLocal recipeID = {recipe._id}/>) : (<SaveSpoonacular 
                                recipeID = {recipe.id}
                                recipeTitle = {recipe.title}    
                            />)}
                        </div>
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
        <GroceryList />
        <section className="search-spacing">
            <GetRecipes/>
        </section>
    <footer>
        <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
    </footer>
</div>
};