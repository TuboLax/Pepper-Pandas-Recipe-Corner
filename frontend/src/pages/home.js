import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import GroceryList from '../components/grocerylist';
import './home.css';
import { RecipeModal } from '../components/recipeModal';

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    const userID = userGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try{
                const response = await axios.get("http://localhost:3000/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipe();
        fetchSavedRecipe();
    }, []);

    const saveRecipe = async (recipeID) => {
        try{
            const response = await axios.put("http://localhost:3000/recipes", { recipeID, userID });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header>
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <h1>Pepper Panda's Recipe Corner</h1>
            </header>
            <GroceryList />
            <section className="local-recipes">
                <h2>What to Cook Today!</h2>
                {recipes.map((recipe) => (
                    <div className="recipe" key={recipe._id}>
                        <div className="image-container">
                            <img src={recipe.image} alt={recipe.title} />
                            <div className="border-overlay"></div>
                        </div>
                        <div className="recipe-content">
                            <div className="title-container">
                                <h3>{recipe.title}</h3>
                                <button
                                    onClick={() => saveRecipe(recipe._id)}
                                    disabled={isRecipeSaved(recipe._id)}
                                >
                                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                                </button>
                            </div>
                            <div className="instructions">
                                <h4>Instructions:</h4>
                                <ol>
                                    {recipe.instructions.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                            <p>Cooking Time: {recipe.readyInMinutes} (min)</p>
                        </div>
                        <RecipeModal
                                recipeID = {recipe._id}
                            />
                    </div>                
                ))}
            </section>
    
            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );      
};
