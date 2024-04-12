import './search.css';
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RecipeModal } from '../components/recipeModal';

const GetRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipe = async() => {
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
        fetchRecipe();
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
                    <RecipeModal
                        recipeID = {recipe._id}
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