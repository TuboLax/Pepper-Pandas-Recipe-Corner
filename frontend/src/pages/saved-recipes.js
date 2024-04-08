import './saved-recipes.css';
import pepperPandaLogo from '../assets/pepper-panda.png';
import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import { RecipeModal } from '../components/recipeModal';
import GroceryList from '../components/grocerylist';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);    
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

    const deleteRecipe = async (recipeID) => {
      try {
        await axios.delete("http://localhost:3000/recipes/deletedRecipes", { data: { recipeID, userID } });
        setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeID)); 
      } catch (err) {
        console.log(err);
      }
    };
/*
    const updateRecipe = async (recipeID) => {
      try {
        await axios.patch("http://localhost:3000/recipes/updatedRecipes", { data: { recipeID, userID } });
        setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeID)); 
      } catch (err) {
          console.log(err);
      }
    }
*/
    return  (
    <div className="container" style={{ paddingTop: '120px' }}>
        <header>
            <div className="logo-container">
                <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
            </div>
            <h1>Pepper's Favorites</h1>
        </header>

        <section className="my-recipes">
                <GroceryList />
                <h2> My Recipes </h2>
                <ul>
                    {savedRecipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div>
                                <h3> {recipe.title} </h3>
                                <button onClick={() => deleteRecipe(recipe._id)}> 
                                  Delete Recipe 
                                </button>
                                <button >
                                  Update Recipe
                                </button>

                            </div>
                            <div className="instructions">
                                <p> {recipe.instructions} </p>
                            </div>
                            <img src={recipe.image} alt={recipe.title}></img>
                            <p> Cooking Time: {recipe.readyInMinutes} (min) </p>
                            <RecipeModal
                                recipeID = {recipe._id}
                            />
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