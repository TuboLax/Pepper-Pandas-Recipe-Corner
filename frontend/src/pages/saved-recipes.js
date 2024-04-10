import './saved-recipes.css';
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import GroceryList from '../components/grocerylist';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);    
    const [isUpdating, setIsUpdating] = useState(null); //to track which recipe is being updated
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
    const userID = userGetUserID();

    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSavedRecipe();
    }, [userID]);

    const startUpdating = (recipe) => {
        setIsUpdating(recipe._id);
        setUpdatedData({
            title: recipe.title,
            image: recipe.image,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            sourceURL: recipe.sourceURL,
            cuisines: recipe.cuisines,
            diets: recipe.diets,
            instructions: recipe.instructions,
            extendedIngredients: recipe.extendedIngredients,
        });
    };

    const handleUpdateChange = (event) => {
        const  { name, value } = event.target;
        setUpdatedData(recipe => ({ ...recipe, [name]: value }));
    };

    const deleteRecipe = async (recipeID) => {
      try {
        await axios.delete("http://localhost:3000/recipes/deletedRecipes", { data: { recipeID, userID } });
        setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeID));
        alert("Recipe Successfully Deleted!"); 
      } catch (err) {
        console.log(err);
      }
    };
    
    const updateRecipe = async (recipeID) => {
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

    //checks if user is owner of recipe
    const isOwner = (recipe) => recipe.userOwner === userID;

    return  (
    <div className="container" style={{ paddingTop: '120px' }}>
        <header>
            <div className="logo-container">
                <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
            </div>
            <h1>Pepper's Favorite</h1>
        </header>

        <section className="my-recipes">
            <GroceryList />
            <h2> My Recipes </h2>
                <ul>
                    {savedRecipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div className="front-recipe-display">
                                <h3>{recipe.title}</h3>
                                <img src={recipe.image} alt={recipe.title}></img>
                            </div>
                            <div className="full-recipe-display">
                                <p> Servings: {recipe.servings} </p>
                                <p> Cooking Time: {recipe.readyInMinutes} (min) </p>
                                <p> Instructions: {recipe.instructions} </p>
                                <p> Ingredients: {recipe.extendedIngredients} </p>
                                <p> Cuisines: {recipe.cuisines} </p>
                                <p> Diets: {recipe.diets} </p>
                                <p> Source URL: {recipe.sourceURL}</p>
                            </div>

                            <div className="buttons">
                                {isOwner(recipe) && (
                                    <button onClick={() => startUpdating(recipe)}> 
                                        Edit Recipe
                                    </button>
                                )}
                                <button onClick={() => deleteRecipe(recipe._id)}> Delete Recipe </button>
                            </div>

                            {isUpdating === recipe._id && (
                                // Inline form for updating
                                <div>
                                    <p> Title: </p>
                                    <input type="text" name="title" value={updatedData.title} onChange={handleUpdateChange} />
                                    <p> Image URL: </p>
                                    <input type="text" name="image" value={updatedData.image} onChange={handleUpdateChange} />
                                    <p> Servings: </p>
                                    <input type="number" name="servings" value={updatedData.servings} onChange={handleUpdateChange} />
                                    <p> Cooking Time (min): </p>
                                    <input type="number" name="readyInMinutes" value={updatedData.readyInMinutes} onChange={handleUpdateChange} />
                                    <p> Instructions: </p>
                                    <input type="text" name="instructions" value={updatedData.instructions} onChange={handleUpdateChange} />
                                    <p> Ingredients: </p>
                                    <input type="text" name="extendedIngredients" value={updatedData.extendedIngredients} onChange={handleUpdateChange} />
                                    <p> Cuisines: </p>
                                    <input type="text" name="cuisines" value={updatedData.cuisines} onChange={handleUpdateChange} />
                                    <p> Diets: </p>
                                    <input type="text" name="diets" value={updatedData.diets} onChange={handleUpdateChange} />
                                    <p> Source URL: </p>
                                    <input type="text" name="sourceURL" value={updatedData.sourceURL} onChange={handleUpdateChange} />

                                    <button onClick={() => updateRecipe(recipe._id)}> Submit Recipe </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
    
        <footer>
            <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
        </footer>
    </div>
    );
};