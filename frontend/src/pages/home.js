import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import GroceryList from '../components/grocerylist';
import './home.css';
import { RecipeModalSpoon } from '../components/Modals/recipeModalSpoon.js';
import {SaveSpoonacular} from './search.js';

export const Home = () => {
    const [recipes, setRecipes] = useState([]);

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

        fetchRecipe();
    }, []);

    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header>
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <h1>Pepper Panda's Recipe Corner</h1>
                </header>
                <GroceryList />
                <div className='heading'>
                    <h2>About Pepper!</h2>
                    <p>Pepper Panda's Recipe Corner is your home to creating, saving, and searching all your favorite recipes!</p>
                </div>
                <div className='container'>
                <section className='about'>
                    <div className='about-image'>
                </div>
                    <div className='about-content'>
                        <h1><b>Pepper's Story</b></h1>
                        <p>
                        Pepper the panda was born in the lush bamboo forests of China, where she spent her years exploring 
                        the wonders of nature and observing her mother's culinary skills. From a young age, Pepper showed an interest in 
                        cooking, often sneaking into the kitchen to watch her mother prepare delicious meals for their clan.<br/> As she grew 
                        older, Pepper knew she wanted to share her family's creations with the rest of the world. She created 
                        <i> Pepper Panda's Recipe Corner</i>, a website where anyone can <b> read, save, and search</b> through Pepper's cookbook.
                        Pepper was also curious to try out all new recipes from her new friends, so she added a page for anyone to <b>create 
                            their own recipe</b> too, which will be added to the friend's cookbook!
                        </p>
                    </div>
                </section>
                </div>
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
        <ul className='recipeList'>
            {randomRecipes.map((random) => (
                <li key={random._id} className='recipeListItem'>
                        <h2>{random.title}</h2>
                        <div className='recImg'>
                            <img src={random.image} alt={random.title} className='search-recipe-image'/>
                        </div>
                        <div className='modalBG'>
                        <RecipeModalSpoon
                            recipeID={random.id}
                        />
                        </div>
                        <br></br>
                        <div className='saveBG'>
                            <SaveSpoonacular 
                                recipeID = {random.id}
                                recipeTitle = {random.title}    
                            />
                        </div>
                </li>
            ))}
        </ul>
    )
}