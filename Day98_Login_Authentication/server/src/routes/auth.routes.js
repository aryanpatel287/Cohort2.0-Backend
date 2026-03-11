const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userModel = require('../model/user.model')

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const { userName, userEmail, userPassword } = req.body

    const isUserAlreadyExists = await userModel.findOne({ userEmail })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "An account with this email already exists."
        })
    }

    const hashedPassword = crypto.createHash("md5").update(userPassword).digest("hex")

    const user = await userModel.create({
        userName, userEmail, userPassword: hashedPassword
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)
    res.status(200).json({
        message: "User registered successfully",
        user,
        token
    })


})

authRouter.post('/protected', (req, res) => {
    console.log(req.cookies)

    res.status(200).json({
        message: "cookies fetched"
    })
})

authRouter.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body

    const user = await userModel.findOne({ userEmail })

    if (!user) {
        return res.status(404).json({
            message: "User not found with this email address"
        })
    }

    const isPasswordMatched = user.userPassword == crypto.createHash("md5").update(userPassword).digest("hex")
    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    res.status(200).json({
        message: "user logged in successfully",
        user
    })
})

module.exports = authRouter