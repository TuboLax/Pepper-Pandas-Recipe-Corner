const mongoose = require('mongoose');

//Recipe model
const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    cuisine: [{type: String, required: true}],
    diet: [{type: String, required: true}],
    instructions:  { type: String, required: true },
    image: { type: String, required: true },
    summary: { type: String, required: true}
});

const RecipeModel = mongoose.model("recipes", RecipeSchema);
module.exports=RecipeModel;