import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import GroceryList from '../components/grocerylist';
import './home.css';
import { RecipeModalLocal } from '../components/recipeModalLocal.js';
import { RecipeModalSpoon } from '../components/recipeModalSpoon.js';

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
            <section className='home-random-recipes'>
                <h2>Pepper's Suggestions!</h2>
                <GetRandom />
            </section>
    
            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );      
};

const GetRandom = () => {
    const [randomRecipes, setRandomRecipes] = useState([]);

    useEffect(() => {
        const fetchRandom = async () => {
            try {
                const response = await axios.get("http://localhost:3000/find/random");
                setRandomRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRandom();
    }, []);

    return (
        <ul className='home-random-recipes-list'>
            {randomRecipes.map((random) => (
                <li key={random._id} className='home-random-recipes-list-item'>
                        <h2>{random.title}</h2>
                        <img src={random.image} alt={random.title} className='home-random-recipes-image'/>
                        <RecipeModalSpoon
                recipeID={random.id}
            />
                </li>
            ))}
        </ul>
    )
}