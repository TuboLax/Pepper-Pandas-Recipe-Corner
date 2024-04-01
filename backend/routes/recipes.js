/**
 * CRUD Operations
 */

require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const RecipeModel = require('../models/Recipes.js');
const UserModel = require('../models/Users.js');
//const verifyToken = require('./users.js');

const recipesRouter = express.Router();

//get all recipes avaliable in collection - edit to as a user
recipesRouter.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});        //finds all RecipeModel documents and properties
        res.json(response);
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
//create a new recipe - creates an instance of RecipeModel
recipesRouter.post("/", async (req, res) => {    
    try {
        const recipe = new RecipeModel(req.body);           //RecipeModel to create new recipe with all properties from body
        const response = await recipe.save();
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
//save a recipe as a user
recipesRouter.put("/", async (req, res) => {
    try {
        const { recipeID, userID } = req.body;                              //get recipe and user ID
        const recipe = await RecipeModel.findById(recipeID);       
        const user = await UserModel.findById(userID);             
        if (!user || !recipe) {                                             //validates if user or recipe exists
            return res.status(404).json({
                message: "User or Recipe not Found."
            })
        }

        user.savedRecipes.push(recipe);                                     //add recipe to user
        await user.save();                                                  //save collection changes
        res.json({ 
            savedRecipes: user.savedRecipes
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
//get all saved recipes in user's savedRecipe array by userID
recipesRouter.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;                       //get user ID 
        const user = await UserModel.findById(userID);            
        if (!user) {                                        //validate if user exists
            return res.status(404).json({
                message: "User Not Found."
            });
        }

        const savedRecipes = await RecipeModel.find({       //query for saved recipes in user collection
            _id: { $in: user.savedRecipes }
        });
        res.json({ savedRecipes });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    } 
});
//get all saved recipes by IDs in user's savedRecipe array by userID (for frontend view on saved recipes page) 
recipesRouter.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;                       //get user ID 
        const user = await UserModel.findById(userID);             
        if (!user) {                                        //validate if user exists
            return res.status(404).json({
                message: "User Not Found."
            });
        }

        res.json({                                          //'?' - user value might be null  
            savedRecipes: user?.savedRecipes 
        });                     
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    } 
});

module.exports = recipesRouter;

/*
//finds and deletes recipe by ID locally by userID
recipesRouter.delete("/:recipeID", async (req, res) => {
    try {
        const recipeID = req.params.recipeID;                       //get recipeID
        const recipe = await RecipeModel.findById(recipeID);        //find recipe by ID
        if (!recipe) {                                              //validates if recipe was found
            return res.status(404).json({ 
                message: "Recipe Not Found." 
            }); 
        }

        const userID = req.user._id;                        //get userID from decoded JWT token
        const user = await UserModel.findById(userID);      //validates if the user has access to delete the recipe
        if (!user) {
            return res.status(404).json({ 
                message: "User Not Found." 
            });
        }
        if (!user.savedRecipes.includes(recipeID)) {        //check if the user has the recipe in their savedRecipes array
            return res.status(401).json({ 
                message: "Unauthorized. Recipe not found in user's saved recipes." 
            });
        }
        await UserModel.findByIdAndUpdate(              //delete recipe from user's savedRecipes Array in user document
            userID, 
            { $pull: { savedRecipes: recipeID } }       //remove recipeID from savedRecipes Array
        );
        res.json({ 
            message: "Recipe Deleted Sucessfully." 
        });
    } catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

//finds and updates recipe by ID locally by userID
recipesRouter.patch("/:recipeID", async (req, res) => {
    try {
        const recipeID = req.params.recipeID;                       //get recipeID
        const { updatedData } = req.body;                           //get new data and properties
        const recipe = await RecipeModel.findById(recipeID);        //find recipe by ID
        if (!recipe) {                                              //validate if recipe was found
            return res.status(404).json({ 
                message: "Recipe Not Found." 
            });
        }

        const userID = req.user.id;                        //get userID - authenticate users and attach their IDs to request object
        if (recipe.userOwner.toString() !== userID) {       //validates if authenticated user is owner of recipe
            return res.status(403).json({
                message: "You are not Authorized to Delete this Recipe."
            });
        }

        const updateRecipe = await RecipeModel.findByIdAndUpdate(           //update recipe with specific fields of new data by ID
            recipeID, { $set: updatedData }, { new: true }
        );       
        res.json({ 
            message: "Recipe Updated Successfully.",
            recipe: updateRecipe 
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
*/

/**
 * // Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ 
            message: "Unauthorized. Token not found." 
        });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.error("Error verifying token:", err);
            return res.status(401).json({ 
                message: "Unauthorized. Invalid token." 
            });
        }
        req.user = decoded; // Attach decoded user object to request
        next();
    });
};
 */