const express = require('express')
const jwt = require('jsonwebtoken')
const RecipeModel = require('../models/Users.js')
const UserModel = require('../models/Users.js')

const readRouter = express.Router();

userRouter.post("/listAll", async (req, res) => {
    const data = req.body
    const user = data.userID

    const recipes = UserModel.findOne(user)

    res.json()
})

userRouter.post("/listFavorites", async (req, res) => {
    const data = req.body
    const user = data.userID

    res.json()
})

module.exports = readRouter