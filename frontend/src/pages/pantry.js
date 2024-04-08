import { useEffect, useState } from 'react';
import { userGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';
import GroceryList from '../components/grocerylist';
import './pantry.css';

window.onload = function() {
    const ingredientBox = document.getElementById("ingredient");

    ingredientBox.addEventListener("keyup", ({key}) => {
        if(key === "Enter") {
            var text = document.getElementById("ingredient").value;
            var li = document.createElement("li");
            if(text != ""){
                li.innerText = text;
                document.getElementById("ingredientList").appendChild(li);
                document.getElementById("ingredient").value = "";
            }
        }
    });
}

function getResults(){
    // var node, list;
    // var searchString;

    // list=[];
    // for(node = document.getElementById('ingredientList').firstChild; node; node = node.nextSibling) {
    //     if(node.nodeType == 1 && node.tagName == 'LI'){
    //         list.push(node.innerHTML);
    //     }
    // }

    // searchString=list.toString;
    ingredientList = getElementById("ingredientList");
    var li = document.createElement("li");
    li.innerText = "done";
    ingredientList.appendChild(li);

}

export const Pantry = () => {
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
                <h2 className="pantryHeader">
                    Please enter any ingredients you would like to cook with:
                    <input type="text" id="ingredient" className="ingredientBox"></input>
                    <button className="searchButton" onclick = "getResults()">Search</button>
                </h2>
                <div className="ingredientDiv">
                    <ul id="ingredientList" className="pantryIngredients">
                    </ul>
                </div>
                <div className="recipeDiv">

                </div>
            </section>

            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};