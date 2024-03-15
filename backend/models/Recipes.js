const mongoose = require('mongoose');

//Recipe model
const RecipeSchema = new mongoose.Schema({
    isSpoonacular: { type: Boolean, required: true },
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    servings: { type: Number, required: true },
    readyInMinutes: { type: Number, required: true },
    sourceName: { type: String, required: true },
    sourceURL: { type: String, required: true },
    spoonacularScore: { type: Number, required: true },
    cuisines: [{ type: String, required: true }],
    dairyFree: { type: Boolean, required: true },
    diets: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    extendedIngredients: [{ type: String, required: true }],
    vegetarian: { type: Boolean, required: true },
    vegan: { type: Boolean, required: true },
    ketogenic: { type: Boolean, required: true },
    glutenFree: { type: Boolean, required: true }
});

const RecipeModel = mongoose.model("recipes", RecipeSchema);
module.exports=RecipeModel;