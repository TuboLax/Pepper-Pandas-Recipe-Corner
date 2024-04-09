import './create-recipes.css';
import pepperPandaLogo from '../assets/pepper-panda.png';
import dairy_free from '../assets/dairy_free.png';
import gluten_free from '../assets/gluten_free.png';
import vegan from '../assets/vegan.png';
import vegitarian from '../assets/vegitarian.png';
import React, { useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GroceryList from '../components/grocerylist';


const GLOBAL_DIETS = ["Vegetarian", "Vegan", "Ketogenic", "Gluten Free", "Dairy Free"];
const GLOBAL_DIETS_ASSETS = [vegitarian, vegan, gluten_free, dairy_free];

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
        <section className="my-recipes">
            <GroceryList />
            < CreateRecipeForm />
        </section>
        <footer>
            <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
        </footer>
    </div>
    );
};

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

const DietsParameter = ( {parameter, setParameter}) => {

    const changeDiet = (diet, index) => {
        // Get the checkbox
        var checkBox = document.getElementById("diets-checkbox-"+diet);
        const updatedList = [...parameter]

        // If the checkbox is checked, add it else remove it
        if (checkBox.checked == true) {
            updatedList[index] = `${diet}`;
            setParameter(updatedList);
        } else {
            updatedList[index] = ""
            setParameter(updatedList)
        }
    }

    return (
        <div className='diets-container'>
            <h2 className='heading'>Diets</h2>
            {GLOBAL_DIETS.map((diet, index) => (
                <div className='diets-checkbox'>
                    <input type="checkbox" id={"diets-checkbox-" + diet}  onClick={() => changeDiet(diet, index)}/>
                    <h5>{diet}</h5>
                </div>
            ))}
        </div>
        
    )
}

const CuisinesParameter = ( {parameter, setParameter} ) => {

    const changeCuisine = (cuisine, index) => {
        // Get the checkbox
        var checkBox = document.getElementById("cuisine-checkbox-"+ cuisine);
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
        <div className='cuisines-container'>
            <h2 className='heading'>Cuisines</h2> 
            {GLOBAL_CUISINES.map((cuisine, index) => (
                <div className='cuisines-checkbox'>
                    <input type="checkbox" id={"cuisine-checkbox-" + cuisine}  onClick={() => changeCuisine(cuisine, index)}/> 
                    <h5>{cuisine}</h5>
                </div>
            ))}
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

const CreateRecipeForm = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
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
            if (title.trim() === "" || readyInMinutes === "" || instructions.length === 0 || extendedIngredients.length === 0) {
                alert("Title/Cooking Time/Instructions/Ingredients is missing")
            } else {
            const recipe = {
                title: title,
                image: image,
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
        <form onSubmit={onSubmit} >
                <ul className='border'>
                    <div className='text-container'>
                        <h2 className='heading'>Recipe Information</h2>
                            <li><TextParameter parameter={title} setParameter={setTitle} formType="Title"/></li>
                            <li><TextParameter parameter={image} setParameter={setImage} formType="Image"/></li>
                            <li><NumberParameter parameter={servings} setParameter={setServings} formType="Servings"/></li>
                            <li><NumberParameter parameter={readyInMinutes} setParameter={setReadyInMinutes} formType="Cooking Time"/></li>
                            <li><ArrayParameter parameter={instructions} setParameter={setInstructions} formType="Instructions"/></li>
                            <li><ArrayParameter parameter={extendedIngredients} setParameter={setExtendedIngredients} formType="Ingredients"/></li>
                    </div>
                    <li><DietsParameter parameter={diets} setParameter={setDiets}/></li>
                    <li><CuisinesParameter parameter={cuisines} setParameter={setCuisines}/></li>
                </ul>   
                <button type="button" onClick={onSubmit} >Create Recipe</button>
        </form>
    );
  }

export default CreateRecipe;