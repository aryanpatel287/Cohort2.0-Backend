const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: isUserAlreadyExists.email == email ? "Email is already registered" : "Username is already taken"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        bio,
        profileImage
    })

    const token = jwt.sign({
        userId: user._id,
        username: user.username
    },
        process.env.JWT_SECRET, { "expiresIn": "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User registered successfully",
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage
    })
}


async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordMatched = bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        userId: user._id,
        username: user.username
    },
        process.env.JWT_SECRET, { "expiresIn": "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successsfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}