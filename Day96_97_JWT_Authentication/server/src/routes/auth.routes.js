const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { userName, userEmail, userPassword } = req.body

    const isUserAlreadyExists = await userModel.findOne({ userEmail })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "An account with this email already exists"
        })
    }
    const user = await userModel.create({
        userName, userEmail, userPassword
    })

    const token = jwt.sign(
        {
            userId: user._id,
            userEmail: userEmail
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)
    
    res.status(200).json({
        message: "User resgistered successfully",
        user,
        token
    })
})

module.exports = authRouter