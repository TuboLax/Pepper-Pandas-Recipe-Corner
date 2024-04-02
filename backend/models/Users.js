const mongoose = require('mongoose');

// User model
const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true
    },
    savedRecipes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "recipes" 
    }],
});

const UserModel = mongoose.model("users", UserSchema); // Changed collection name to "User" (singular)
module.exports = UserModel;
