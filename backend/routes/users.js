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
           return res.status(400).json({ regStatus, message: "User already exists." });
       }

       regStatus = true;
       const hashed = await argon2.hash(password); // Hash password using argon2
       const newUser = new UserModel({ username, password: hashed });
       await newUser.save();
       return res.json({ regStatus, message: "Account Created Successfully. Proceed to login." });
   } catch (error) {
       console.error("Error occurred during account creation:", error);
       return res.status(500).json({ message: "Internal Server Error" });
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

module.exports = userRouter;

/*
//middleware to verify jwt token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET, (err) => {
            if (err) {
                res.sendStatus(403);
            };
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = verifyToken;*/