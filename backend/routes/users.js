const express = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2'); // Replace bcrypt with argon2
const UserModel = require('../models/Users.js');

const userRouter = express.Router();
const SECRET = "8aJaDbI6DtHof5jvDD75J8OfscAs0optTyF";

userRouter.post("/createAccount", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "User already exists." });
    }

    const hashed = await argon2.hash(password); // Use argon2 to hash the password
    const newUser = new UserModel({ username, password: hashed });
    await newUser.save();
    res.json({ message: "Account Created Successfully." });
});

userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.json({ message: "User does not exist." });
    }

    const passMatches = await argon2.verify(user.password, password); // Use argon2 to verify the password
    if (!passMatches) {
        return res.json({ message: "Username / Password is Incorrect." });
    }

    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token, userID: user._id });
});

module.exports = userRouter;