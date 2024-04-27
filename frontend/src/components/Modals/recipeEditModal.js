import './recipeEditModal.css'
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
        <div className="modal">
            <div className='editBox'>
                <div className='editInnerBox'>
                <div className='edit-titleChange'>
                    <span><b> Title: </b></span>
                    <span><input type="text" name="title" value={updatedData.title} onChange={handleUpdateChange} /></span>
                </div>   
                <div className='edit-imgChange'>
                    <span><b> Image URL: </b></span>
                    <span><input type="text" name="image" value={updatedData.image} onChange={handleUpdateChange} /></span>
                </div>
                <div className='edit-srvChange'>
                    <span><b> Servings: </b></span>
                    <span><input type="number" name="servings" value={updatedData.servings} onChange={handleUpdateChange} min='1' max='999'/></span>
                </div>
                <div className='edit-prepChange'>
                <span><b> Preparation Time (Minutes): </b></span>
                    <span><input type="number" name="readyInMinutes" value={updatedData.readyInMinutes} onChange={handleUpdateChange} min='1' max='999'/></span>
                </div>
                <div className='edit-instChange'>
                    <h3><b> Instructions: </b></h3>
                    <div className='edit-instChange-box'>
                        {updatedData.instructions.map((instruction, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="instructions"
                                    value={instruction}
                                    onChange={(element) => handleArrayChange(index, element.target.value, "instructions")}
                                />
                            <button className='edit-rmvButton' onClick={() => removeArrayElement(index, "instructions")}> X </button>
                            </div>
                    ))}
                    </div>
                    <button className='edit-instChange-addButton' onClick={() => addArrayElement("instructions")}> 
                        Add Instruction 
                    </button>
                </div>
                <div className='edit-ingChange'>
                    <h3><b> Ingredients: </b></h3>
                    <div className='edit-ingChange-box'>
                        {updatedData.extendedIngredients.map((ingredient, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="extendedIngredients"
                                    value={ingredient}
                                    onChange={(element) => handleArrayChange(index, element.target.value, "extendedIngredients")}
                                />
                                <button className='edit-rmvButton' onClick={() => removeArrayElement(index, "extendedIngredients")}> X </button>
                            </div>
                    ))}
                    </div>
                    <button className='edit-ingChange-addButton' onClick={() => addArrayElement("extendedIngredients")}>
                        Add Ingredient
                    </button>
                </div>
                <div className='edit-cuisChange'>
                    <h3><b> Cuisines: </b></h3>
                    <div className='edit-cuisChange-box'>
                        {updatedData.cuisines.map((cuisine, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="cuisines"
                                    value={cuisine}
                                    onChange={(element) => handleArrayChange(index, element.target.value, "cuisines")}
                                />
                                <button className='edit-rmvButton' onClick={() => removeArrayElement(index, "cuisines")}> X </button>
                            </div>
                        ))}
                    </div>
                        <button className='edit-cuisChange-addButton' onClick={() => addArrayElement("cuisines")}>
                            Add Cuisine
                        </button>
                </div>
                <div className='edit-dietChange'>
                <h3><b> Diets: </b></h3>
                    <div className='edit-dietChange-box'>
                        {updatedData.diets.map((diet, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="diets"
                                    value={diet}
                                    onChange={(element) => handleArrayChange(index, element.target.value, "diets")}
                                />
                                <button className='edit-rmvButton' onClick={() => removeArrayElement(index, "diets")}> X </button>
                            </div>
                        ))}
                    </div>
                        <button className='edit-dietChange-addButton' onClick={() => addArrayElement("diets")}>
                            Add Diet
                        </button>
                </div>
                <div className='edit-srcURLChange'>
                    <h3><b> Source URL: </b></h3>
                    <input type="text" name="sourceURL" value={updatedData.sourceURL} onChange={handleUpdateChange} />
                </div>
                <div className='whiteSpace'></div>
                <button className='edit-saveButton' onClick={handleUpdate}> Save Recipe </button>
                <button className='edit-cancelButton' onClick={handleClose}> Cancel </button>
            </div>
        </div>
     </div>
    );
};