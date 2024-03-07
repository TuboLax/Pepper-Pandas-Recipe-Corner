const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserModel = require('../models/Users.js');

const userRouter= express.Router();
const SECRET = "9w8ed32eHDsc923hGSDB832Hdcjsbwe7sducDH923nd";

//Create Account
userRouter.post("/createAccount", async(req, res) => {
    const {username, password} = req.body; // asks for user input
    
    const user = await UserModel.findOne({username}); // checks if username received from input matches any in the database
    if (user) {
        return res.json({ message: "User already exists."});
    }

    const salt = crypto.randomBytes(16).toString('hex');    //salt encryption is generated
    const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex');    //password is hashed with salt encryption for security

    const newUser = new UserModel({ username, password: hashedPassword });  //store new account in DB
    
    await newUser.save();
    res.json({message: "Account Created Successfully."});
});

userRouter.post("/login", async(req,res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({username});
    if (!user) {
        return res.json({message: "User does not exist."});
    }

    const hashedPassword = hashPassword(password, user.password.salt);
    if (hashedPassword !== user.password.hash) {    //compares hashed passoword with hashed input
        return res.json({ message: "Username / Password is Incorrect." });
    }

    const token = jwt.sign({id: user._id}, SECRET);
    res.json({token,userID: user._id});
});

module.exports = userRouter;