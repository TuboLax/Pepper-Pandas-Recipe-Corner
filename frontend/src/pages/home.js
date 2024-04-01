import bambooSaladImage from '../assets/bamboo-salad.jpg';
import bambooStirFryImage from '../assets/bamboo-stir-fry.jpg';
import pepperPandaLogo from '../assets/pepper-panda.png';
import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
//import { useCookies } from 'react-cookie';
import axios from 'axios';


import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    //const [cookies,] = useCookies(["accessToken"]);

    const userID = userGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try{
                const response = await axios.get("http://localhost:3000/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipe();
        fetchSavedRecipe();
    }, []);

    const saveRecipe = async (recipeID) => {
        try{
            const response = await axios.put("http://localhost:3000/recipes", { recipeID, userID });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div className="container">
            <header>
                <div className="logo-container">
                    <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
                </div>
                <h1>Welcome to Pepper Panda's Recipe Corner</h1>
            </header>

            <section className="local-recipes">
                <h2> Local Recipes </h2>
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div>
                                <h3> {recipe.title} </h3>
                                <button 
                                    onClick={() => saveRecipe(recipe._id)}
                                    disabled={isRecipeSaved(recipe._id)}
                                > 
                                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                                </button>
                            </div>
                            <div className="instructions">
                                <p> {recipe.instructions} </p>
                            </div>
                            <img src={recipe.image} alt={recipe.title}></img>
                            <p> Cooking Time: {recipe.readyInMinutes} (min) </p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="featured-recipes">
                <h2>Featured Recipes</h2>
                <div className="recipe">
                    <h3>Pepper Panda's Bamboo Salad</h3>
                    <p>A refreshing salad made with fresh bamboo shoots and garden greens.</p>
                    <img src={bambooSaladImage} alt="Bamboo Salad" />
                </div>
                <div className="recipe">
                    <h3>Pepper Panda's Bamboo Stir Fry</h3>
                    <p>A delicious stir fry packed with colorful vegetables and tender bamboo shoots.</p>
                    <img src={bambooStirFryImage} alt="Bamboo Stir Fry" />
                </div>
            </section>


            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};

const SearchTitle = () => {
    const [title, setTitle] = useState("")
    const [number, setNumber] = useState("")
    const [, setCookies] = useCookies(["accessToken"])
    const navigate = useNavigate();
  
    const onSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const test = await axios.get(`http://localhost:3000/recipes/getTitle/${title}/${number}`);
        console.log(test.data);
        //const input = await axios.post("http://localhost:3000/auth/login", { username, password });
        //const loginBool = input.data.logStatus;
        //console.log(loginBool);
        // if (loginBool === "true") {
        //   setCookies("accessToken", input.data.token);
        //   window.localStorage.setItem("userID", input.data.userID);
        //   navigate("/");
        // } else {
        //   alert(input.data.message);
        // }
      } catch (err) {
        console.error(err);
      }
    }
  
    return (
      <Form
        title={title}
        setTitle={setTitle}
        number={number}
        setNumber={setNumber}
        formType="Search by Title"
        onSubmit={onSubmit}
      />
    );
  };

  const Form = ({ title, setTitle, number, setNumber, formType, onSubmit }) => {
    return (
      <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2>{formType}</h2>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number: </label>
            <input
              type="number"
              id="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)} />
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    );
  }