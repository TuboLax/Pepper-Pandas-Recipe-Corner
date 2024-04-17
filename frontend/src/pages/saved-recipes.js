import './saved-recipes.css';
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import { RecipeModalLocal } from '../components/recipeModalLocal';
import GroceryList from '../components/grocerylist';


export const SavedRecipes = () => {
    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header>
                <div className="logo-container">
                    <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
                </div>
                <h1>Pepper's Favorite</h1>
            </header>

            <section className="my-recipes">
                <GroceryList />
                <SavedRecipesForm />
            </section>

            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>    
        </div>
    );
};

const SavedRecipesForm = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);    
    const [isUpdating, setIsUpdating] = useState(null); 
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
            cuisines: [...recipe.cuisines],
            diets: [...recipe.diets],
            instructions: [...recipe.instructions],
            extendedIngredients: [...recipe.extendedIngredients],
        });
    };

    const handleUpdateChange = (event) => {
        const  { name, value } = event.target;
        setUpdatedData(recipe => ({ ...recipe, [name]: value }));
    };
    
    const handleArrayChange = async (index, value, element) => {
        setUpdatedData( recipe => ({
            ...recipe,
            [element]: recipe[element].map((item, i) => i === index ? value : item)
        }));
    };
    
    const addArrayElement = async (element) => {
        setUpdatedData(recipe => ({
            ...recipe,
            [element]: [...recipe[element], ''] // Add an empty string or a default value
        }));
    };
    
    const removeArrayElement = (index, element) => {
        setUpdatedData(recipe => ({
            ...recipe, 
            [element]: recipe[element].filter((_, i) => i !== index)
        }));
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

    return (
        <ul>
            {savedRecipes.map((recipe) => (
                <li key={recipe._id}>
                    <div className="recipe-display">
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title}></img>
                    </div>
                    <RecipeModalLocal
                        recipeKey = {recipe}
                    />

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
                                {updatedData.instructions.map((instruction, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="instructions"
                                            value={instruction}
                                            onChange={(element) => handleArrayChange(index, element.target.value, "instructions")}
                                        />
                                        <button onClick={() => removeArrayElement(index, "instructions")}> X </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayElement("instructions")}> 
                                    Add Instruction 
                                </button>
                            <p> Ingredients: </p>
                                {updatedData.extendedIngredients.map((ingredient, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="extendedIngredients"
                                            value={ingredient}
                                            onChange={(element) => handleArrayChange(index, element.target.value, "extendedIngredients")}
                                        />
                                        <button onClick={() => removeArrayElement(index, "extendedIngredients")}> X </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayElement("extendedIngredients")}>
                                    Add Ingredient
                                </button>
                            <p> Cuisines: </p>
                                {updatedData.cuisines.map((cuisine, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="cuisines"
                                            value={cuisine}
                                            onChange={(element) => handleArrayChange(index, element.target.value, "cuisines")}
                                        />
                                        <button onClick={() => removeArrayElement(index, "cuisines")}> X </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayElement("cuisines")}>
                                    Add Cuisine
                                </button>
                            <p> Diets: </p>
                                {updatedData.diets.map((diet, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="diets"
                                            value={diet}
                                            onChange={(element) => handleArrayChange(index, element.target.value, "diets")}
                                        />
                                        <button onClick={() => removeArrayElement(index, "diets")}> X </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayElement("diets")}>
                                    Add Diet
                                </button>
                            <p> Source URL: </p>
                            <input type="text" name="sourceURL" value={updatedData.sourceURL} onChange={handleUpdateChange} />

                            <button onClick={() => updateRecipe(recipe._id)}> Save Recipe </button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SavedRecipes;

/*
const TextParameter = ( {parameter, setParameter, formType} ) => {
    return (
        <div>
            <h3>{formType}</h3>
            <input
            className='text-input'
            type="text"
            value={parameter}
            onChange={(event) => setParameter(event.target.value)} />
      </div>
    )
}

const NumberParameter = ( {parameter, setParameter, formType} ) => {
    return (
        <div>
            <h3>{formType}</h3>
            <input
            type="number"
            min="0"
            value={parameter}
            onChange={(event) => setParameter(event.target.value)} />
      </div>
    )
}

const ArrayParameter = ( {parameter, setParameter, formType} ) => {
    const [inputValue, setInputValue] = useState('');

    const add = (item) => {
        if (item.trim() === "" ) {
            alert("Invalid input");
        } else {
            setParameter([...parameter, item]);
        }
    };

    const remove = (index) => {
        const updatedList = [...parameter];
        updatedList.splice(index, 1);
        setParameter(updatedList);
    };
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <div>
                <h3>{formType}</h3>
                    {parameter.map((item, index) => (
                        <div className='array'>
                            <button type="button" onClick={() => remove(index)}>X</button>
                            <span>{item}</span>
                        </div>
                    ))}
            </div>
            <div>
                <div className='array-input-box'>{inputValue ? '' : '"Enter" for another input'}</div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            add(" " + inputValue);
                            setInputValue('');
                        }
                    }}
                />
            </div>
        </div>
    )
};
*/

/**
 * export const SavedRecipes = () => {
    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header>
                <div className="logo-container">
                    <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
                </div>
                <h1>Pepper's Favorite</h1>
            </header>

            <section className="my-recipes">
                <GroceryList />
                <SavedRecipesForm />
            </section>

            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>    
        </div>
    );
};

const SavedRecipesForm = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);    
    const [isUpdating, setIsUpdating] = useState(null); 
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
            cuisines: [...recipe.cuisines],
            diets: [...recipe.diets],
            instructions: [...recipe.instructions],
            extendedIngredients: [...recipe.extendedIngredients],
        });
    };

    const handleUpdateChange = (event) => {
        const  { name, value } = event.target;
        setUpdatedData(recipe => ({ ...recipe, [name]: value }));
    };
    
    const handleArrayChange = async (index, value, element) => {
        setUpdatedData( recipe => ({
            ...recipe,
            [element]: recipe[element].map((item, i) => i === index ? value : item)
        }));
    };
    
    const addArrayElement = async (element) => {
        setUpdatedData(recipe => ({
            ...recipe,
            [element]: [...recipe[element], ''] // Add an empty string or a default value
        }));
    };
    
    const removeArrayElement = (index, element) => {
        setUpdatedData(recipe => ({
            ...recipe, 
            [element]: recipe[element].filter((_, i) => i !== index)
        }));
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

    return (
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
                        <p> Instructions: </p>
                            <ul>
                                {recipe.instructions.map((instruction, index) => (
                                    <p key={index}>
                                        {instruction}
                                    </p>
                                ))}
                            </ul>
                        <p> Ingredients: </p>
                            <ul>
                                {recipe.extendedIngredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        <p> Cuisines: </p>
                            <ul>
                                {recipe.cuisines.map((cuisine, index) => (
                                    <li key={index}>
                                        {cuisine}
                                    </li>
                                ))}
                            </ul>
                        <p> Diets: </p>
                            <ul>
                                {recipe.diets.map((diet, index) => (
                                    <li key={index}>
                                        {diet}
                                    </li>
                                ))}
                            </ul>
                        <p> Source URL: {recipe.sourceURL}</p>
                        <RecipeModalLocal
                            recipeKey = {recipe}
                        />
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
                                {updatedData.instructions.map((instruction, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="instructions"
                                            value={instruction}
                                            onChange={(element) => handleArrayChange(index, element.target.value, "instructions")}
                                        />
                                        <button onClick={() => removeArrayElement(index, "instructions")}> X </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayElement("instructions")}> 
                                    Add Instruction 
                                </button>
                            <p> Ingredients: </p>
                                {updatedData.extendedIngredients.map((ingredient, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="extendedIngredients"
                                            value={ingredient}
                                            onChange={(element) => handleArrayChange(index, element.target.value, "extendedIngredients")}
                                        />
                                        <button onClick={() => removeArrayElement(index, "extendedIngredients")}> X </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayElement("extendedIngredients")}>
                                    Add Ingredient
                                </button>
                            <p> Cuisines: </p>
                                {updatedData.cuisines.map((cuisine, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="cuisines"
                                            value={cuisine}
                                            onChange={(element) => handleArrayChange(index, element.target.value, "cuisines")}
                                        />
                                        <button onClick={() => removeArrayElement(index, "cuisines")}> X </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayElement("cuisines")}>
                                    Add Cuisine
                                </button>
                            <p> Diets: </p>
                                {updatedData.diets.map((diet, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="diets"
                                            value={diet}
                                            onChange={(element) => handleArrayChange(index, element.target.value, "diets")}
                                        />
                                        <button onClick={() => removeArrayElement(index, "diets")}> X </button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayElement("diets")}>
                                    Add Diet
                                </button>
                            <p> Source URL: </p>
                            <input type="text" name="sourceURL" value={updatedData.sourceURL} onChange={handleUpdateChange} />

                            <button onClick={() => updateRecipe(recipe._id)}> Save Recipe </button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SavedRecipes;
 */