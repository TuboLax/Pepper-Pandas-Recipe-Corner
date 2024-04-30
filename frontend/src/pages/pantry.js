import { useState, useEffect } from 'react';
import GroceryList from '../components/grocerylist';
import './pantry.css';
import axios from 'axios';
import { RecipeModalSpoon } from '../components/Modals/recipeModalSpoon';
import { RecipeModalLocal } from '../components/Modals/recipeModalLocal';
import { userGetUserID } from '../hooks/useGetUserID';
import { SaveSpoonacular } from './search.js';

export const Pantry = () => {
    const [ingredientList, setIngredientList] = useState([]);
    const [inputIngredientValue, setIngredientValue] = useState('');        //Variables that need to change from user input
    const [recipes, setRecipes] = useState([]);

    const addItemToIngredientList = (item) => {
        setIngredientList([...ingredientList, item]);       //Add an ingredient to the list
    ;}

    const removeItemFromIngredientList = (index) => {
        const updatedIngredientList = [...ingredientList];  //Remove an ingredient from the list and set the input field empty
        updatedIngredientList.splice(index, 1);
        setIngredientList(updatedIngredientList);
    };

    const handleInputChange = (e) => {
        setIngredientValue(e.target.value);
    };

    const search = async() => {                             //This function creates the string for spoonacular and retrieves results
        var searchString = "";

        if(ingredientList.length != 0){                     //As long as the ingredient list has at least one ingredient it will run.
            ingredientList.forEach((ingredient) => {
                searchString += ingredient + ",+"
            });
            searchString += "&number=9&ignorePantry=true";
            
            var response = await axios.get(`http://localhost:3000/find/ingredients/${searchString}`);
            setRecipes(response.data);
        }
        
    }

    return (
        <div className="container" style={{paddingTop: '120px' }}>
            <header>
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <h1>Panda's Pantry</h1>
            </header>

            <aside className="notepad-container">
                <GroceryList />
            </aside>

            <section className="pantry">
                <h2 className="pantryHeader" id="id1">
                    What would you like to cook with?
                </h2>
                <div className="ingredients-container">
                    <div className="ingredients-list">
                        <ul className="item-list">
                            {ingredientList.map((item, index) => (
                                <div className="ingredientItem">
                                    <li key={index} className="ingredient">
                                        <span>{item}</span>
                                    </li>
                                    <button className='removeButton' onClick={() => removeItemFromIngredientList(index)}>
                                        X
                                    </button>
                                </div>
                                
                            ))}
                        </ul>
                    </div>

                    <div className="ingredient-input">
                    <input
                        type="text"
                        className="ingredientBox"
                        value={inputIngredientValue}
                        onChange={handleInputChange}
                        placeholder="Add ingredients here!"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && inputIngredientValue.trim().trim() !== "") {
                                addItemToIngredientList(inputIngredientValue.trim());
                                setIngredientValue('');
                            }
                        }}
                    />
                            <button type="button" className="pantrySearchButton" onClick={() => search()}>
                                Search
                            </button>
                    </div>
                </div>

                <div className="recipeDiv">
                    <ul className='pantryRecipeList'>
                        {recipes.map((recipe) => (
                            <li key={recipe._id} className='pantryRecipeListItem'>
                                    <h2 className='pantryRecipeTitle'>{recipe.title}</h2>
                                    <div className='pantryRecImg'>
                                        <img src={recipe.image} alt={recipe.title} className='search-recipe-image'/>
                                    </div>
                                    <div className='modalBG buttons'>
                                    <RecipeModalSpoon
                                        recipeID={recipe.id}
                                    />
                                    </div>
                                    <br></br>
                                    <div className='saveBG buttons'>
                                        <SaveSpoonacular 
                                            recipeID = {recipe.id}
                                            recipeTitle = {recipe.title}    
                                        />
                                    </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </section>

            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};
