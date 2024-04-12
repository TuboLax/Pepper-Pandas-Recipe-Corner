import './recipeModal.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import veganLogo from '../assets/food icons/vegan.png';
import vegetarianLogo from '../assets/food icons/vegitarian.png';
import pescLogo from '../assets/food icons/pescatarian.PNG';
import ketoLogo from '../assets/food icons/keto.PNG';
import dairyFreeLogo from '../assets/food icons/dairy_free.png';
import glutenFreeLogo from '../assets/food icons/gluten_free.png';

export const RecipeModalSpoon = (recipeID) =>
{
    const [modal, setModal] = useState(false);

    const toggleModal = () =>
    {
        setModal(!modal);
    }

    if(modal)
    {
        document.body.classList.add('overlayScrollBlock');
    }
    else
    {
        document.body.classList.remove('overlayScrollBlock');
    }

    return(
        <>
        <button className='auth-button' onClick={toggleModal}>Full Recipe</button>
        {modal && (
            <div className='modal'>
                <div className='overlay' onClick={toggleModal}></div>
                <div className='fullDetails'>
                    <Form
                    ID = {recipeID}
                    />
                    <button className='closeModal' onClick={toggleModal}>Close</button>
                    <div className='borderImg'></div>
                </div>
            </div>
        )}
        </>
    );
}

const Form = (ID) =>{
    const[recipes,setRecipes] = useState([]);
    const recID=ID;
    useEffect(() => {
        const fetchSpoonacularRecipe = async() => {
            try{
                const response = await axios.get(`http://localhost:3000/find/id/${recID.ID.recipeID}`);
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSpoonacularRecipe();
    }, [recID]);

    console.log(recipes);
    //console.log(ID);
    let spoonScore= parseInt(JSON.stringify(recipes.spoonacularScore));
    let ingredients=Object.values(recipes.extendedIngredients || {});
    console.log(ingredients);
    let sourceURL=JSON.stringify(recipes.sourceURL);
    //console.log(sourceURL);
    return(
        <ul>
                <li key={recipes._id}>
                    <div className='popoutBody'>
                        <h1 className='recName'>{recipes.title}</h1>
                        <h3 className='recCategories'>Recipe Categories</h3>
                        <>
                            <img src={veganLogo} style={{width:'80px', height:'80px'}} className='yes' id="vegan" alt="Vegan" title="Is Vegan"></img>
                            <img src={vegetarianLogo} style={{width:'80px', height:'80px'}} className='yes' id="vegetarian" alt='Vegetarian' title="Is Vegetarian"></img>
                            <img src={pescLogo} style={{width:'80px', height:'80px'}} className='no' id="pescatarian" alt='Pescatarian' title="Not Pescatarian"></img>
                            <img src={ketoLogo} style={{width:'80px', height:'80px'}} className='no' id= "keto" alt='Ketogenic' title="Not Ketogenic"></img>
                            <img src={glutenFreeLogo} style={{width:'80px', height:'80px'}} className='yes' id="glutenFree" alt='Gluten Free' title="Is Gluten Free"></img>
                            <img src={dairyFreeLogo} style={{width:'80px', height:'80px'}} className='yes' id= "dairyFree" alt='Dairy Free' title="Is Dairy Free"></img>
                        </>
                        <>
                            <p></p>
                            <span style={{padding:'5px'}}> <b>Servings:</b> {recipes.servings}</span>
                            <span style={{padding:'5px'}}><b>Preparation Time:</b> {recipes.readyInMinutes}</span>
                            <span style={{padding:'5px'}}><b>Spoonacular Score:</b> {spoonScore} / 100</span>
                        </>
                        <div className='ingBox'>
                            <h3 className='ingHead'>Ingredients:</h3>
                            <div>
                                {ingredients.map((ing) => {
                                    console.log(ing.original);
                                            <input type="checkbox" name={ing.original}/>
                                        })}
                            </div>
                        </div>
                        <div className='dirBox'>
                            <h3 className='directionsHeader'>Directions:</h3>
                            <>
                                <p className='recInstructions'>{recipes.instructions}</p>
                            </>
                        </div>
                        <a href={sourceURL} target='_blank'>Visit Original Recipe</a>
                    </div>
                    <div onLoad={checkCategories(recipes)}></div>
                </li>
        </ul>
    );
}
const checkCategories = (recipes) =>
{
    
    var veganIcon= document.getElementById("vegan");
    var vegetarianIcon= document.getElementById("vegetarian");
    var pescIcon= document.getElementById("pescatarian");
    var ketoIcon= document.getElementById("keto");
    var glutenFreeIcon= document.getElementById("glutenFree");
    var dairyFreeIcon= document.getElementById("dairyFree");
    //console.log(recipes);
    //console.log(veganIcon);
    document.addEventListener("DOMContentLoaded", (event)=>{
    if(recipes.vegan!==true)
    {
        veganIcon.className='no';
        veganIcon.title="Not Vegan";
    }
    if(!recipes.vegetarian)
    {
        vegetarianIcon.className.replace='no';
        vegetarianIcon.title='Not Vegetarian';
    }
    if(!recipes.glutenFree)
    {
        glutenFreeIcon.className.replace='no';
        glutenFreeIcon.title='Not Gluten Free';
    }
    if(!recipes.dairyFree)
    {
        dairyFreeIcon.className.replace='no';
        dairyFreeIcon.title='Not Dairy Free';
    }
    console.log(veganIcon.className);
    let dietArray=Object.values(recipes.diets || {});
    for(var i=0; i<dietArray.length; i++)
    {
        if(dietArray[i]==='pescatarian')
        {
           pescIcon.className.replace='yes';
           pescIcon.title='Is Pescatarian';
        }
        else if(dietArray[i]==='ketogenic')
        {
            ketoIcon.className.replace='yes';
            ketoIcon.title='Is Ketogenic';
        }
    }
});
}