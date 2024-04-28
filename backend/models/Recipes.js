const mongoose = require('mongoose');

//Recipe model
const RecipeSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: false 
    },
    servings: { 
        type: Number, 
        required: false 
    },
    readyInMinutes: { 
        type: Number, 
        required: true 
    },
    sourceName: { 
        type: String, 
        required: false 
    },
    sourceURL: { 
        type: String, 
        required: false 
    },
    spoonacularScore: { 
        type: Number, 
        required: false 
    },
    cuisines: [{ 
        type: String, 
        required: false 
    }],
    dairyFree: { 
        type: Boolean, 
        required: false 
    },
    diets: [{ 
        type: String, 
        required: false 
    }],
    instructions: [{ 
        type: String, 
        required: true 
    }],
    extendedIngredients: [{ 
        type: String, 
        required: true 
    }],
    vegetarian: { 
        type: Boolean, 
        required: false 
    },
    vegan: { 
        type: Boolean, 
        required: false 
    },
    ketogenic: { 
        type: Boolean, 
        required: false 
    },
    glutenFree: { 
        type: Boolean, 
        required: false 
    },
    userOwner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true 
    }
});

const RecipeModel = mongoose.model("recipes", RecipeSchema);
module.exports = RecipeModel;