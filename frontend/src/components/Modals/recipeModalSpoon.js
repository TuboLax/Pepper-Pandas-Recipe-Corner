import './recipeModal.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import veganLogo from '../../assets/food icons/vegan.png';
import vegetarianLogo from '../../assets/food icons/vegitarian.png'; //corrected my spelling
import pescLogo from '../../assets/food icons/pescatarian.PNG';
import ketoLogo from '../../assets/food icons/keto.PNG';
import dairyFreeLogo from '../../assets/food icons/dairy_free.png';
import glutenFreeLogo from '../../assets/food icons/gluten_free.png';

export const RecipeModalSpoon = (recipeID) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    if (modal) {
        document.body.classList.add('overlayScrollBlock');
    } else {
        document.body.classList.remove('overlayScrollBlock');
    }

    return (
        <>
            <button className='auth-button' onClick={toggleModal}> Full Recipe </button>
            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleModal}></div>
                    <div className='fullDetails'>
                        <Form
                            ID = {recipeID}
                        />
                        <button className='closeModal' onClick={toggleModal}> Close </button>
                        <div className='borderImg'></div>
                    </div>
                </div>
            )}
        </>
    );
}

const Form = (ID) => {
    const [recipes, setRecipes] = useState([]);
    const recID = ID;
    // if <li> or <ol> pops up in the directions from spoonacular this will auto generate the html
    let directions = recipes.instructions ? recipes.instructions.split('\n') : [];
    const createMarkup = (html) => {
        return { __html: html };
    };

    useEffect(() => {
        const fetchSpoonacularRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/find/id/${recID.ID.recipeID}`);
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSpoonacularRecipe();
    }, [recID]);

    // Separate some info for HTML output
    let spoonScore = parseInt(JSON.stringify(recipes.spoonacularScore));
    let ingredientsArr = Object.values(recipes.extendedIngredients || {});

    // Get cuisine tags and separate with commas
    let cuisineArr = Object.values(recipes.cuisines || {});
    for (var i = 0; i < cuisineArr.length; i++) {
        if (i !== (cuisineArr.length) - 1) {
            cuisineArr[i] += ', ';
        }
    }
    if (cuisineArr.length === 0){
        cuisineArr[0] = 'No Tags Found'
    }
    
    // ----------------------------------------
    
    // Fill Pescatarian Bool
    console.log(recipes);
    let pescBool = false;
    let dietArr = Object.values(recipes.diets || {});
    for (var i = 0; i < dietArr.length; i++) {
        if (dietArr[i] === 'pescatarian') {
            pescBool=true;
        }
    }

    return (
        <ul>
            <li key={recipes._id}>
                <div>
                    <h1 className='recName'>{recipes.title}</h1>
                    <h3> Recipe Categories </h3>
                    <>
                        {recipes.vegan && (
                            <img 
                                src={veganLogo} 
                                style={{width:'80px', height:'80px'}} 
                                className='logos' 
                                id="vegan" 
                                alt="Vegan" 
                                title="Vegan"
                            ></img>
                        )}
                        {recipes.vegetarian && (
                            <img 
                                src={vegetarianLogo} 
                                style={{width:'80px', height:'80px'}} 
                                className='logos' 
                                id="vegetarian" 
                                alt='Vegetarian' 
                                title="Vegetarian"
                            ></img>
                        )}
                        {pescBool && (
                            <img 
                                src={pescLogo} 
                                style={{width:'80px', height:'80px'}} 
                                className='logos' 
                                id="pescatarian" 
                                alt='Pescatarian' 
                                title="Pescatarian"
                            ></img>
                        )}
                        {recipes.ketogenic && (
                            <img 
                                src={ketoLogo} 
                                style={{width:'80px', height:'80px'}} 
                                className='logos' 
                                id= "keto" 
                                alt='Ketogenic' 
                                title="Ketogenic"
                            ></img>
                        )}
                        {recipes.glutenFree && (
                            <img 
                                src={glutenFreeLogo} 
                                style={{width:'80px', height:'80px'}} 
                                className='logos' 
                                id="glutenFree" 
                                alt='Gluten Free' 
                                title="Gluten Free"
                            ></img>
                        )}
                        {recipes.dairyFree && (
                            <img 
                                src={dairyFreeLogo} 
                                style={{width:'80px', height:'80px'}} 
                                className='logos' 
                                id="dairyFree" 
                                alt='Dairy Free' 
                                title="Dairy Free"
                            ></img>
                        )}
                   </>
                    <>
                        <p></p>
                        <span style={{padding:'15px'}}> <b> Servings: </b> {recipes.servings}</span>
                        <span style={{ display: "inline-flex", alignItems: "center", marginRight: "10px" }}>
                            <b>Preparation Time</b> <div className="timer"></div> {recipes.readyInMinutes} Minutes 
                        </span>
                        <span style={{padding:'15px'}}><b> Popularity Score: </b> {spoonScore} / 100 </span>
                    </>
                    <>
                    <div>
                        <p></p>
                        <span><b> Cuisine Tags: </b> </span>
                        <span>{cuisineArr}</span>
                    </div>
                    </>
                    <div className='boxes'>
                        <div className='ingBox'>
                            <h3 className='ingHead'><b> Ingredients: </b></h3>
                            <div>
                                {ingredientsArr.map((ing, index) => {
                                    return ( // needed a return for the mapping
                                        <div key={index}>
                                            <input className='ingCheck' type="checkbox" name={ing.original}/>
                                            <label className='ingLabel'>{ing.original}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='dirBox'>
                            <h3 className='directionsHeader'><b> Directions: </b></h3>
                            <div className='directionsList'>
                                {directions.map((step, index) => ( // parses through so that it breaks the text into a list
                                    <li key={index} dangerouslySetInnerHTML={createMarkup(step)}></li>
                                ))}
                            </div>
                        </div>
                    </div>
                    <a className="sourceURL" href={recipes.sourceUrl} target='_blank'> Visit Original Recipe </a>
                </div>
            </li>
        </ul>
    );
}