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

                <button onClick={handleUpdate}> Save Recipe </button>
                <button onClick={handleClose}> Cancel </button>
            </div>
        </div>
    );
};