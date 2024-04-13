require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2'); // Import argon2 for password hashing
const UserModel = require('../models/Users.js');

const userRouter = express.Router();

userRouter.post("/createAccount", async (req, res) => {
   try {
       const { username, password } = req.body;
       let regStatus = false;

       const user = await UserModel.findOne({ username });

       if (user) {
           return res.json({ regStatus, message: "User already exists." }).status(400); //Fixed pop-up alert
       }

       regStatus = true;
       const hashed = await argon2.hash(password); // Hash password using argon2
       const newUser = new UserModel({ username, password: hashed });
       await newUser.save();
       return res.json({ regStatus, message: "Account Created Successfully. Proceed to login." });
   } catch (error) {
       console.error("Error occurred during account creation:", error);
       return res.json({ message: "Internal Server Error" }).status(500); // Fixed pop-up alert
   }
});

userRouter.post("/login", async (req, res) => {
   const { username, password } = req.body;
   let logStatus = "false";

   const user = await UserModel.findOne({ username });
   if (!user) {
       logStatus = "false1";
       return res.json({ logStatus, message: "User does not exist." });
   }

   const passMatches = await argon2.verify(user.password, password); // Verify password using argon2
   if (!passMatches) {
       logStatus = "false2";
       return res.json({ logStatus, message: "Username / Password is Incorrect." });
   }
   logStatus = "true";
   const token = jwt.sign({ id: user._id }, process.env.SECRET);
   res.json({ logStatus, token, userID: user._id });
});

userRouter.delete("/deleteAccount/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        const { password } = req.body;
 
        // Check if the user exists
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }
 
        // Verify the provided password
        const passMatches = await argon2.verify(user.password, password);
        if (!passMatches) {
            return res.json({ success: false, message: "Incorrect password." });
        }
 
        // Password is correct, delete the user
        await UserModel.findByIdAndDelete(userID);
 
        return res.json({ success: true, message: "Account deleted successfully." });
    } catch (error) {
        console.error("Error occurred during account deletion:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
 });  

module.exports = userRouter;