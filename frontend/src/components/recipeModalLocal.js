import './recipeModal.css';
import { useState, useEffect } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';

export const RecipeModalLocal = (recipeKey) =>
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
                    recipe = {recipeKey}
                    />
                    <button className='closeModal' onClick={toggleModal}>Close</button>
                </div>
            </div>
        )}
        </>
    );
}

const Form = (recipe) =>{
    /*
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
*/
    console.log(recipe);
    //console.log(savedRecipes);
    //console.log(ID);
    return(0);
}