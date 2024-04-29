import './recipeModal.css'
import React, { useState } from 'react'

export const RecipeEditModal = ({ recipe, onUpdate, onClose }) => {
    const [updatedData, setUpdatedData] = useState({ ...recipe });

    const handleUpdateChange = (event) => {
        const { name, value } = event.target;
        setUpdatedData((prevData) => ({ 
            ...prevData, 
            [name]: value 
        }));
    };
    
    const handleArrayChange = (index, value, element) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            [element]: prevData[element].map((item, i) => i === index ? value : item)
        }));
    };
    
    const addArrayElement = (element) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            [element]: [...prevData[element], ''] // Add an empty string with prev data
        }));
    };

    const removeArrayElement = (index, element) => {
        setUpdatedData((prevData) => ({
            ...prevData, 
            [element]: prevData[element].filter((_, i) => i !== index)
        }));
    };

    const handleUpdate = () => {
        onUpdate(updatedData);
    };

    const handleClose = () => {
        onClose();
        setUpdatedData({ ...recipe }); 
    };

    return (
        <div className="modal overlay">
            <div className="modal-content">
                <p> Title: </p>
                <input type="text" name="title" value={updatedData.title} onChange={handleUpdateChange} />
                <p> Image URL: </p>
                <input type="text" name="image" value={updatedData.image} onChange={handleUpdateChange} />
                <p> Servings: </p>
                <input type="number" name="servings" value={updatedData.servings} onChange={handleUpdateChange} />
                <p> Preparation Time (min): </p>
                <input type="number" name="readyInMinutes" value={updatedData.readyInMinutes} onChange={handleUpdateChange} />
                <p> Instructions: </p>
                    {updatedData.instructions.map((instruction, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="instructions"
                                value={instruction}
                                onChange={(element) =>{
                                    if(element.target.value.trim() == "") {removeArrayElement(index, "instructions")}
                                    handleArrayChange(index, element.target.value, "instructions")
                                }}
                            />
                            <button onClick={() => removeArrayElement(index, "instructions")}> X </button>
                        </div>
                    ))}
                    <button onClick={() => {
                        if(updatedData.instructions.length > 0) {
                            if(updatedData.instructions[updatedData.instructions.length - 1].trim() != "")
                                addArrayElement("instructions");
                        } else {addArrayElement("instructions")}
                    }}> Add Instruction </button>

                <p> Ingredients: </p>
                    {updatedData.extendedIngredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="extendedIngredients"
                                value={ingredient}
                                onChange={(element) =>{
                                    if(element.target.value.trim() == "") {removeArrayElement(index, "extendedIngredients")}
                                    handleArrayChange(index, element.target.value, "extendedIngredients")
                                }}
                            />
                            <button onClick={() => removeArrayElement(index, "extendedIngredients")}> X </button>
                        </div>
                    ))}
                    <button onClick={() => {
                        if(updatedData.extendedIngredients.length > 0) {
                            if(updatedData.extendedIngredients[updatedData.extendedIngredients.length - 1].trim() != "")
                                addArrayElement("extendedIngredients");
                        } else {addArrayElement("extendedIngredients")}
                    }}> Add Ingredient </button>

                <p> Cuisines: </p>
                    {updatedData.cuisines.map((cuisine, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="cuisines"
                                value={cuisine}
                                onChange={(element) =>{
                                    if(element.target.value.trim() == "") {removeArrayElement(index, "cuisines")}
                                    handleArrayChange(index, element.target.value, "cuisines")
                                }}
                            />
                            <button onClick={() => removeArrayElement(index, "cuisines")}> X </button>
                        </div>
                    ))}
                    <button onClick={() => {
                        if(updatedData.cuisines.length > 0) {
                            if(updatedData.cuisines[updatedData.cuisines.length - 1].trim() != "")
                                addArrayElement("cuisines");
                        } else {addArrayElement("cuisines")}
                    }}> Add Cuisine </button>

                <p> Diets: </p>
                    {updatedData.diets.map((diet, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="diets"
                                value={diet}
                                onChange={(element) =>{
                                    if(element.target.value.trim() == "") {removeArrayElement(index, "diets")}
                                    handleArrayChange(index, element.target.value, "diets")
                                }}
                            />
                            <button onClick={() => removeArrayElement(index, "diets")}> X </button>
                        </div>
                    ))}
                    <button onClick={() => {
                        if(updatedData.instructions.length > 0) {
                            if(updatedData.diets[updatedData.diets.length - 1].trim() != "")
                                addArrayElement("diets");
                        } else {addArrayElement("diets")}
                    }}> Add Diet </button>

                <p> Source URL: </p>
                <input type="text" name="sourceURL" value={updatedData.sourceURL} onChange={handleUpdateChange} />

                <button onClick={handleUpdate}> Save Recipe </button>
                <button onClick={handleClose}> Cancel </button>
            </div>
        </div>
    );
};