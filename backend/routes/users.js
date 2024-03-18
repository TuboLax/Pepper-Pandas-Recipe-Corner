const express = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2'); // Replace bcrypt with argon2
const UserModel = require('../models/Users.js');

const userRouter = express.Router();
const SECRET = "8aJaDbI6DtHof5jvDD75J8OfscAs0optTyF";

userRouter.post("/createAccount", async (req, res) => {
    const { username, password } = req.body;
    let regStatus=false;

    const user = await UserModel.findOne({ username });

    if (user) {
        regStatus=false;
        return res.json({ regStatus, message: "User already exists." });
    }
    regStatus=true;
    const hashed = await argon2.hash(password); // Use argon2 to hash the password
    const newUser = new UserModel({ username, password: hashed });
    await newUser.save();
    res.json({regStatus, message: "Account Created Successfully. Proceed to login." });
});

userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let logStatus="false";

    const user = await UserModel.findOne({ username });
    if (!user) {
        logStatus="false1";
        return res.json({logStatus, message: "User does not exist." });
    }

    const passMatches = await argon2.verify(user.password, password); // Use argon2 to verify the password
    if (!passMatches) {
        logStatus="false2";
        return res.json({ logStatus, message: "Username / Password is Incorrect." });
    }
    logStatus="true";
    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ logStatus, token, userID: user._id });
});

module.exports = userRouter;