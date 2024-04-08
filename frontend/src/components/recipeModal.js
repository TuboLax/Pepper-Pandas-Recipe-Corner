import './recipeModal.css';
import { useState, useEffect } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';

export const RecipeModal = (recipeID) =>
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
                </div>
            </div>
        )}
        </>
    );
}

const Form = (ID) =>{
    const[recipes,setRecipes] = useState("");
    const [savedRecipes, setSavedRecipes] = useState("");
    const userID = userGetUserID();
    const recID=ID;
    useEffect(() => {
        const fetchSpoonacularRecipe = async() => {
            try{
                const response = await axios.get(`http://localhost:3000/find/id/${recID}`);
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get("http://localhost:3000/recipes/savedRecipes/recipe/",{data: { recID, userID}});
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSpoonacularRecipe();
        fetchSavedRecipe();
    }, [recID]);

    console.log(recipes);
    //console.log(savedRecipes);
    console.log(ID);
    return(
        <ul>
            
                <li key={recipes._id}>
                    <div>
                        <h1 className='recName'>{recipes.title}</h1>
                        <h3 className='recCategories'>Recipe Categories</h3>
                        <img src={recipes.image} alt={recipes.title}></img>
                        <h3 className='directionsHeader'>Directions:</h3>
                    </div>
                </li>
        </ul>
    );
}