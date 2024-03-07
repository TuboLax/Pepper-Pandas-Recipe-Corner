const express = require('express');
const jwt=require('jsonwebtoken');
const crypto = require('crypto');
const UserModel = require('../models/Users.js');

const userRouter= express.Router();
const SECRET = "8aJaDbI6DtHof5jvDD75J8OfscAs0optTyF";


userRouter.post("/createAccount", async(req, res) =>
{
    const {username, password} = req.body; // asks for user input

    const user = await UserModel.findOne({username}); // checks if username received from input matches any in the database

    if(user)
    {
        return res.json({ message: "User already exists."});
    }

    const hashedPassword = crypto.createHash('sha256', SECRET).update(password).digest('hex'); //hash password for security
    const newUser = new UserModel({username, password: hashedPassword}); //store new account in DB
    await newUser.save();
    res.json({message: "Account Created Successfully."});
});

userRouter.post("/login", async(req, res)=>
{
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});
    if(!user)
    {
        return res.json({message: "User does not exist."});
    }

    const passMatches = await user.password.localeCompare(crypto.createHash('sha256', SECRET).update(password).digest('hex')); //compares hashed passoword with hashed input
    if(passMatches)
    {
        return res.json({message: "Username / Password is Incorrect."});
    }

    const token=jwt.sign({id: user._id}, SECRET);
    res.json({token, userID: user._id});
});

module.exports = userRouter;