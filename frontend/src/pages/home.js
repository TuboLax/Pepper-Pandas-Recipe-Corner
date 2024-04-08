import bambooSaladImage from '../assets/bamboo-salad.jpg';
import bambooStirFryImage from '../assets/bamboo-stir-fry.jpg';
import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import GroceryList from '../components/grocerylist';
import './home.css';

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
                <h1>Welcome to Pepper Panda's Recipe Corner</h1>
            </header>
            <GroceryList />
            <section className="local-recipes">
                <h2> Local Recipes </h2>
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div>
                                <h3> {recipe.title} </h3>
                                <button id= "buttonColor"
                                    onClick={() => saveRecipe(recipe._id)}
                                    disabled={isRecipeSaved(recipe._id)}
                                > 
                                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                                </button>
                            </div>
                            <div className="instructions">
                                <p> {recipe.instructions} </p>
                            </div>
                            <img src={recipe.image} alt={recipe.title}></img>
                            <p> Cooking Time: {recipe.readyInMinutes} (min) </p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="featured-recipes">
                <h2>Pepper's Favorites</h2>
                <div className="recipe">
                    <h3>Pepper Panda's Bamboo Salad</h3>
                    <p>A refreshing salad made with fresh bamboo shoots and garden greens.</p>
                    <img src={bambooSaladImage} alt="Bamboo Salad" />
                </div>
                <div className="recipe">
                    <h3>Pepper Panda's Bamboo Stir Fry</h3>
                    <p>A delicious stir fry packed with colorful vegetables and tender bamboo shoots.</p>
                    <img src={bambooStirFryImage} alt="Bamboo Stir Fry" />
                </div>
            </section>

            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};
