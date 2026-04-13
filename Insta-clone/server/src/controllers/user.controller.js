const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const followModel = require('../models/follow.model')

async function getMeController(req, res) {
    const userId = req.user.id

    const userDetails = await userModel.findById(userId)

    if (!userDetails) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    res.status(200).json({
        message: "user details fetched successfully",
        user: {
            username: userDetails.username,
            email: userDetails.email,
            bio: userDetails.bio,
            profileImage: userDetails.profileImage
        }
    })
}

async function getAllUsersController(req, res) {

    const allUsers = await userModel.find()

    if (!allUsers) {
        return res.status(404).json({
            message: "users not found"
        })
    }

    res.status(200).json({
        message: "users details fetched successfully",
        allUsers
    })
}

async function getUserController(req, res) {
    const requestedUsername = req.params.username


    const userDetails = await userModel.findOne({ username: requestedUsername }).lean()

    if (!userDetails) {
        return res.status(404).json({
            message: "user not found",
        })
    }

    const followerUserId = req.user.id
    const followeeUserId = userDetails._id

    const followRecord = await followModel.findOne({
        follower: followerUserId,
        followee: followeeUserId
    })

    const followStatus = followRecord ? followRecord.status : "none"


    res.status(200).json({
        message: "user found successfully",
        userDetails: {
            ...userDetails,
            followStatus
        }
    })
}

module.exports = {
    getMeController,
    getAllUsersController,
    getUserController
}