import './create-recipes.css';
import pepperPandaLogo from '../assets/logos/pepper-panda.png';
import dairy_free from '../assets/food icons/dairy_free.png';
import gluten_free from '../assets/food icons/gluten_free.png';
import vegan from '../assets/food icons/vegan.png';
import vegitarian from '../assets/food icons/vegitarian.png';
import keto from '../assets/food icons/keto.PNG';
import pescatarian from '../assets/food icons/pescatarian.PNG';
import React, { useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GroceryList from '../components/grocerylist';


const GLOBAL_DIETS = ["Vegetarian", "Vegan", "Ketogenic", "Gluten Free", "Dairy Free", "Pescatarian"];
const GLOBAL_DIETS_ASSETS = [vegitarian, vegan, keto, gluten_free, dairy_free, pescatarian];

const GLOBAL_CUISINES = ["African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese",
    "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian",
    "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern",
    "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"];

export const CreateRecipe = () => {
    return (
    <div className="container"  style={{ paddingTop: '120px' }}>
        <header>
            <div className="logo-container">
                <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
            </div>
            <h1>Pepper's Cooking</h1>
        </header>
        <GroceryList />
        <section className="my-recipes-create">
            
            < CreateRecipeForm />
        </section>
        <footer>
            <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
        </footer>
    </div>
    );
};

const TextParameter = ({ parameter, setParameter, formType }) => {
    let placeholderText = "";
    switch (formType) {
      case "Title":
        placeholderText = "Enter Recipe Title (e.g., Pepper's Favorite Stir Fry)";
        break;
      case "Image":
        placeholderText = "Paste Image URL";
        break;
      case "Source URL":
        placeholderText = "Paste Recipe Source URL";
        break;
      case "Source Name":
        placeholderText = "Enter Recipe Source Name (e.g., Pepper Panda)";
        break;
      default:
        placeholderText = `Enter ${formType}`;
    }
  
    return (
      <div>
        <h3>{formType}</h3>
        <input
            className="text-input-create"
            type="text"
            placeholder={placeholderText}
            value={parameter}
            onChange={(event) => setParameter(event.target.value)}
        />
      </div>
    );
};

const NumberParameter = ({ parameter, setParameter, formType }) => {
    return (
        <div>
            <h3>{formType}</h3>
            <input
                type="number"
                min="0"
                value={parameter}
                onChange={(event) => setParameter(event.target.value)}
                className="number-border-input" />
        </div>
    );
};

const DietsParameter = ({ parameter, setParameter }) => {

    const changeDiet = (diet, index) => {
        const updatedList = [...parameter];
        if (updatedList.includes(diet)) {
            updatedList.splice(updatedList.indexOf(diet), 1);
        } else {
            updatedList.push(diet);
        }
        setParameter(updatedList);
    }

    return (
        <div className='diets-container-create'>
            <h2 className='heading-create'>Diets</h2>
            {GLOBAL_DIETS.map((diet, index) => (
                <div className='diets-checkbox-create' key={index}>
                    <input type="checkbox" id={"diets-checkbox-create-" + diet} onClick={() => changeDiet(diet, index)} />
                    <img src={GLOBAL_DIETS_ASSETS[index]} alt={diet} />
                    <h5>{diet}</h5>
                </div>
            ))}
        </div>

    )
}

const CuisinesParameter = ( {parameter, setParameter} ) => {

    const changeCuisine = (cuisine, index) => {
        // Get the checkbox
        var checkBox = document.getElementById("cuisine-checkbox-create-"+ cuisine);
        const updatedList = [...parameter]

        // If the checkbox is checked, display the output text
        if (checkBox.checked == true) {
            updatedList[index] = `${cuisine}`;
            setParameter(updatedList);
        } else {
            updatedList[index] = ""
            setParameter(updatedList)
        }
    }

    return (
        <div className='cuisines-container-create'>
            <h2 className='heading-create'>Cuisines</h2> 
            {GLOBAL_CUISINES.map((cuisine, index) => (
                <div className='cuisines-checkbox-create'>
                    <input type="checkbox" id={"cuisine-checkbox-create-" + cuisine}  onClick={() => changeCuisine(cuisine, index)}/> 
                    <h5>{cuisine}</h5>
                </div>
            ))}
        </div>
        
    )
}

const ArrayParameter = ({ parameter, setParameter, formType }) => {
    const [inputValue, setInputValue] = useState('');

    const add = (item) => {
        if (item.trim() === "") {
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            add(inputValue);
            setInputValue('');
        }
    };

    return (
        <div>
            <div>
                <h3>{formType}</h3>
                {parameter.map((item, index) => (
                    <div className='array-create' key={index}>
                        <div className="array-item">
                            <span>{formType === "Instructions" ? index + 1 + ". " : ""}{item}</span>
                            <button type="button" className="remove-button-create" onClick={() => remove(index)}>X</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div className='array-input-box-create'>{inputValue ? '' : `Enter ${formType} one at a time:`}</div>
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress} 
                    className="array-input" // Use the class for input styling
                />
            </div>
        </div>
    )
};

const CreateRecipeForm = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [sourceURL, setsourceURL] = useState("");
    const [servings, setServings] = useState("");
    const [readyInMinutes, setReadyInMinutes] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [extendedIngredients, setExtendedIngredients] = useState([]);
    const [diets, setDiets] = useState([]);
    const [cuisines, setCuisines] = useState([]);

    const userID = userGetUserID();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!userID) {
                alert("You must be logged in to create a recipe.");
                return;
            }

            if (title.trim() === "" || readyInMinutes === "" || instructions.length === 0 || extendedIngredients.length === 0) {
                alert("Title/Preparation Time/Instructions/Ingredients is missing")
            } else {
                const recipe = {
                    title: title,
                    image: image,
                    sourceURL: sourceURL,
                    servings: servings,
                    readyInMinutes: readyInMinutes,
                    instructions: instructions,
                    extendedIngredients: extendedIngredients,
                    diets: diets,
                    cuisines: cuisines,
                    userOwner: userID,
                }

                await axios.post("http://localhost:3000/recipes", recipe);
                alert("Recipe Created!");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <ul className='border-create'>
                <div className='text-container-create'>
                    <h2 className='heading-create'>Recipe Information</h2>
                    <li><TextParameter parameter={title} setParameter={setTitle} formType="Title" /></li>
                    <li><TextParameter parameter={image} setParameter={setImage} formType="Image" /></li>
                    <li><TextParameter parameter={sourceURL} setParameter={setsourceURL} formType="Source URL" /></li>
                    <li><NumberParameter parameter={servings} setParameter={setServings} formType="Servings" /></li>
                    <li style={{ display: "flex", alignItems: "center" }}>
                        <NumberParameter parameter={readyInMinutes} setParameter={setReadyInMinutes} formType="Preparation Time (Minutes)" />
                        <div className="timer"></div>
                    </li>
                    <li><ArrayParameter parameter={instructions} setParameter={setInstructions} formType="Instructions" /></li>
                    <li><ArrayParameter parameter={extendedIngredients} setParameter={setExtendedIngredients} formType="Ingredients" /></li>
                    <li className="button-container">
                        <button type="submit" className="create-recipe-button-create">Create Recipe</button>
                    </li>
                </div>
                <li><DietsParameter parameter={diets} setParameter={setDiets} /></li>
                <li><CuisinesParameter parameter={cuisines} setParameter={setCuisines} /></li>
            </ul>
        </form>
    );
}

export default CreateRecipeForm;