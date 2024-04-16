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

        const userID = recipe.userOwner;
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found."
            })
        }

        user.savedRecipes.push(recipe);
        await user.save();
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
        const userID = req.params.userID;                        
        const user = await UserModel.findById(userID);            
        if (!user) {                                        
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
//get all saved recipes by IDs in user's savedRecipe array by userID  
recipesRouter.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;                        
        const user = await UserModel.findById(userID);             
        if (!user) {                                        
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

//get all saved recipes by IDs in user's savedRecipe array by userID  
recipesRouter.post("/savedRecipes/recipe/:recipeID", async (req, res) => {
    try {
        const recipeID = req.params.recipeID;                        
        const recipe = await RecipeModel.findById(recipeID);             
        if (!recipe) {                                        
            return res.status(404).json({
                message: "Recipe Not Found."
            });
        }

        res.json({                                            
            recipe 
        });

    } catch (err) { //Generic catch statement
        res.status(500).json({
            message: "Internal Server Error"
        });
    } 
});

//finds and deletes recipe by ID locally by userID
recipesRouter.delete("/deletedRecipes", async (req, res) => {
    try {
        const { recipeID, userID } = req.body;
        const recipe = await RecipeModel.findById(recipeID);
        if (!recipe) {
            return res.status(404).json({
                message: "Recipe Not Found."
            });
        }
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found."
            });
        }

        if (!user.savedRecipes.includes(recipeID)) {        //check if user has the recipe in their savedRecipes array
            return res.status(401).json({
                message: "Unauthorized. Recipe not found in User's savedRecipes."
            });
        }

        await UserModel.findByIdAndUpdate(                  //delete recipe from user's savedRecipes Array in user document
            userID, { $pull: { savedRecipes: recipeID } }, {new: true}
        );       

        const updatedUser = await UserModel.findById(userID);
        res.json({
            message: "Recipe Deleted Successfully", 
            savedRecipes: updatedUser.savedRecipes
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

//finds and updates recipe by ID locally by userID
recipesRouter.patch("/updatedRecipes", async (req, res) => {
    try {
        const { recipeID, userID, updatedData } = req.body;
        const recipe = await RecipeModel.findById(recipeID);
        if (!recipe) {
            return res.status(404).json({
                message: "Recipe Not Found."
            });
        }
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found."
            });
        }

        if (!user.savedRecipes.includes(recipeID)) {        
            return res.status(401).json({
                message: "Unauthorized. Recipe not found in user's savedRecipes."
            });
        }

        const updatedRecipe = await RecipeModel.findByIdAndUpdate(          //update recipe with specific fields of new data by ID
            recipeID, { $set: updatedData }, { new: true}
        );

        res.json({ 
            message: "Recipe Updated Successfully.",
            recipe: updatedRecipe 
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = recipesRouter;