import './saved-recipes.css';
import pepperPandaLogo from '../assets/pepper-panda.png';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    //const [deletedRecipes, setDeletedRecipes] = useState([]);
    //const [updatedRecipes, setUpdatedRecipes] = useState([]);
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
    }, []);

    /*
    const deleteRecipe = async (recipeID) => {
        try {
            const response = await axios.delete(`http://localhost:3000/recipes/${recipeID}`);
            setDeletedRecipes(response.data.deletedRecipes)
        } catch (err) {
            console.log(err);
        }
    }
    const updateRecipe = async (recipeID) => {
        try {
            const response = await axios.patch(`http://localhost:3000/recipes/${recipeID}`);
            setUpdatedRecipes(response.data.deletedRecipes)
        } catch (err) {
            console.log(err);
        }
    }
    */

    return  (
    <div className="container">
        <header>
            <div className="logo-container">
                <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
            </div>
            <h1>Pepper's Favorite</h1>
        </header>

        <section className="my-recipes">
                <h2> My Recipes </h2>
                <ul>
                    {savedRecipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div>
                                <h3> {recipe.title} </h3>
                                <button> Delete Recipe </button>
                                <button> Update Recipe </button>
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

        <footer>
            <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
        </footer>
    </div>
    );
};

/**
const Recipes = () => {
  const [cookies] = useCookies(['accessToken']); // Access the JWT token

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`http://YOUR_BACKEND_URL/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}` // Include the JWT in the request headers
        }
      });
      // Handle successful deletion, e.g., update the UI accordingly
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(error);
    }
  };
  // Render your recipes, each with a delete button that calls handleDelete with its ID
  return (
    <div>
      { Your code to list recipes }
      {For each recipe, include a delete button like below }
      { <button onClick={() => handleDelete(recipe.id)}>Delete</button> }
      </div>
      );
    };
    
    export default Recipes;
 */
/**

const YourComponent = () => {
  const [cookies] = useCookies(['accessToken']); // Access the JWT token from cookies

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}` // Use the token from cookies here
        }
      });
      console.log(response.data);
      // Handle response...
    } catch (error) {
      console.error(error);
      // Handle error...
    }
  };

  // Your component's return statement...
};
 */