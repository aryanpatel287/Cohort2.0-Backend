const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const blacklistModel = require("../models/blacklist.model")
const redis = require('../config/cache')

async function registerUserController(req, res) {
    console.log(req.body)
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "username, email and password are required"
        })
    }

    const isTokenExists = req.cookies?.token
    if (isTokenExists) {
        return res.status(400).json({
            message: "token already provided, logout to register."
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: isUserAlreadyExists.email === email ? "email already exists" : "username already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    return res.status(201).json({
        message: "user registered successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUserController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET, { "expiresIn": "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "logged in successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: "token not found"
        })
    }

    res.clearCookie("token")

    await redis.set(token, Date.now().toString())

    return res.status(200).json({
        message: "logged out successfully"
    })
}

async function getMeController(req, res) {
    console.log("at the controller")
    const user = await userModel.findById(req.user.id)

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    console.log("at the controller", user)
    return res.status(200).json({
        message: "user found successfully",
        user
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}