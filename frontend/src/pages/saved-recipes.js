import './saved-recipes.css';
import '../components/Modals/recipeModal.css';
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RecipeModalLocal } from '../components/Modals/recipeModalLocal.js';
import { RecipeEditModal } from '../components/Modals/recipeEditModal.js';
import GroceryList from '../components/grocerylist';
import { Link } from 'react-router-dom';

import { SavedBar } from '../components/searchSaved.js';
// Checks if the user searches or not
let ALTERNATE = window.location.search.includes('filter');


export const SavedRecipes = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userID = window.localStorage.getItem("userID");
        setIsLoggedIn(!!userID);
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="container" style={{ paddingTop: '120px'}}>
                <header className="header">
                    <div className="logo-container">
                        <div className="logo"></div>
                    </div>
                    <h1>Pepper's Settings</h1>
                </header>
                <section className="content">
                <p className="sign-in-message">
                    Please sign in to view your Saved Recipes!<br/>
                    Click <Link to="/auth" className="link-color">here</Link> to sign in.
                </p>
                </section>
                <footer className="footer">
                    <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
                </footer>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header>
                <div className="logo-container">
                    <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
                </div>
                <h1> Pepper's Favorite </h1>
            </header>
            <GroceryList />
            <SavedBar />
            <section className="my-recipes">
                <SavedRecipesForm />
            </section>
            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>    
        </div>
    );
};

const SavedRecipesForm = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);    
    const [isUpdating, setIsUpdating] = useState(null); 
    const [updatedData, setUpdatedData] = useState({ 
        title: '' ,
        image: '',
        servings: 0,
        readyInMinutes: 0,
        sourceURL:'',
        cuisines: [],
        diets: [],
        instructions: '',
        extendedIngredients: [],
    });

    const userID = window.localStorage.getItem("userID");

    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };
        const searchSaved = async () => {
            try {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                
                const filter = urlParams.get('filter');
                const query = urlParams.get('query');
            
                const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/${userID}`);
                let temp = response.data.savedRecipes;
                let tempArray = [];

                switch (filter) {
                    case 'title':
                        // First loop that goes through the local recipes
                        temp.map((savedRecipe) => {
                            if(savedRecipe.title.toLowerCase().includes(query.toLowerCase()) && !tempArray.includes(savedRecipe)) {
                                tempArray.push(savedRecipe);
                            }
                        })
                        break;
                    case 'cuisine':
                        // First loop that goes through the local recipes
                        temp.map((savedRecipe) => {
                            let tempString = savedRecipe.cuisines.toString().toLowerCase()    // Converts the cuisines array to a String and lowercases it
                            // Checks if the query (lowercased) appears in the cuisines' String
                            if (tempString.includes(query.replace(" ", "").toLowerCase()) && !tempArray.includes(savedRecipe)) {
                                tempArray.push(savedRecipe);
                            }
                        })
                        break;
                    case 'diet':
                        // First loop that goes through the local recipes
                        temp.map((savedRecipe) => {
                            let tempString = savedRecipe.diets.toString().replace(" ", "").toLowerCase()
                            if (tempString.includes(query.replace(" ", "").toLowerCase()) && !tempArray.includes(savedRecipe)) {
                                tempArray.push(savedRecipe)
                            }
                        })
                        break;
                    case 'ingredients':
                        const formatQuery = query.toLowerCase().split(",")  // Query turns into an array                   
                        // First loop through all of the local recipes
                        temp.map((savedRecipe) => {
                            let tempSavedIngredients = savedRecipe.extendedIngredients.toString().replace(" ", "");   // Converts the ingredients to a String
                            // Second loop to check if each query appears in the ingredients
                            formatQuery.forEach(queryIngredient => {
                                if(tempSavedIngredients.includes(queryIngredient) && !tempArray.includes(savedRecipe)) {
                                    tempArray.push(savedRecipe);
                                }
                            });
                        })
                        break;
                    default:
                        break;
                }
                // setSavedRecipes(tempArray.slice(tempArray.length/2));
                setSavedRecipes(tempArray);
            } catch(err) {
                console.log(err);
            }
        }
        
        if (ALTERNATE) {
            searchSaved();
        } else {
            fetchSavedRecipe();
        }
    }, [userID]);

    const startUpdating = (recipe) => {
        setIsUpdating(recipe._id);
        setUpdatedData({
            title: recipe.title,
            image: recipe.image,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            sourceURL: recipe.sourceURL,
            cuisines: [...recipe.cuisines],
            diets: [...recipe.diets],
            instructions: [...recipe.instructions],
            extendedIngredients: [...recipe.extendedIngredients],
        });
    };

    const deleteRecipe = async (recipeID) => {
        try {
            await axios.delete("http://localhost:3000/recipes/deletedRecipes", { data: { recipeID, userID } });
            setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeID));
            alert("Recipe Deleted!"); 
        } catch (err) {
            console.log(err);
        }
    };
      
    const updateRecipe = async (recipeID, updatedData) => {
        try {
            const response = await axios.patch("http://localhost:3000/recipes/updatedRecipes", { 
                recipeID: recipeID, 
                userID: userID, 
                updatedData: updatedData 
            });
            
            const updatedRecipes = savedRecipes.map(
                recipe => recipe._id === recipeID ? response.data.recipe : recipe
            );
    
            setSavedRecipes(updatedRecipes);
            setIsUpdating(null);
            alert("Recipe Updated!");
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setIsUpdating(null);
    }

    const isOwner = (recipe) => recipe.userOwner === userID;

    return (
        <div>
            {savedRecipes.length === 0 ? (
                <div className="empty-cookbook-message">
                    <p>Your cookbook looks empty, add your favorites here!</p>
                </div>
            ) : (
                <ul className='recipeList'>
                    {savedRecipes.map((recipe) => (
                        <li key={recipe._id} className='recipeListItem'>
                            <h2>{recipe.title}</h2>
                            <div className='recImg'>
                                <img src={recipe.image} alt={recipe.title} className='search-recipe-image'></img>
                            </div>
                            <div className="modalBG">
                                <RecipeModalLocal
                                    recipeKey = {recipe}
                                />
                            </div>
                            <br></br>
                            <div className='deleteBG'>
                            <button className='auth-button' onClick={() => deleteRecipe(recipe._id)}>Delete Recipe</button>
                            </div>
                            <br></br>
                            {isOwner(recipe) && (
                                <div className='editBG'>
                                <button className='auth-button' onClick={() => startUpdating(recipe)}>Edit Recipe</button>
                                </div>
                            )}

                            {isUpdating === recipe._id && (
                                <RecipeEditModal
                                    recipe = {recipe}
                                    onUpdate = {(updatedRecipeData) => updateRecipe(recipe._id, updatedRecipeData)}
                                    onClose = {handleClose}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SavedRecipes;