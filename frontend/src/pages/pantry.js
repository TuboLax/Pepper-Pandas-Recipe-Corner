import { useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import GroceryList from '../components/grocerylist';
import './pantry.css';
import axios from 'axios';
import { RecipeModalSpoon } from '../components/Modals/recipeModalSpoon';

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
            searchString += "&number=9";                    //Currently have the number of results set low for testing.
            
            var response = await axios.get(`http://localhost:3000/find/ingredients/${searchString}`);
            setRecipes(response.data);
        }
        
    }

    return (
        <div className="container">
            <header>
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <h1>Welcome to Pepper Panda's Pantry Mode</h1>
            </header>

            <aside className="notepad-container">
                <GroceryList />
            </aside>

            <section className="pantry">
                <h2 className="pantryHeader" id="id1">
                    Please enter any ingredients you would like to cook with:
                </h2>

                <div className="listContainer">
                    <ul className="item-list">
                        {ingredientList.map((item, index) => (
                            <li key={index} className="ingredient">
                                <span>{item}</span>
                                <button onClick={() => removeItemFromIngredientList(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ingredientContainer">
                        <input
                            type="text"
                            className="ingredientBox"
                            value={inputIngredientValue}
                            onChange={handleInputChange}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    addItemToIngredientList(inputIngredientValue);
                                    setIngredientValue('');
                                }
                            }}
                        />
                        <button className="searchButton" onClick={() => search()}>
                            Search
                        </button>
                </div>

                <div className="recipeDiv">
                    <ul className='recipeList'>
                        {recipes.map((recipe) => (
                        <li key={recipe._id} className='recipeListItem'>
                            <div>
                                <h2 className='recipeListItemTitle'>{recipe.title}</h2>
                            </div>
                            <img src={recipe.image} alt={recipe.title} />
                            <RecipeModalSpoon
                            recipeID = {recipe.id}
                            />
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