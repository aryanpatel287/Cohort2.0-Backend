const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followerUsername == followeeUsername) {
        return res.status(400).json({
            message: "follower and followee cannot be same"
        })
    }

    const isFolloweeExists = await userModel.findOne({ followeeUsername })
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: `you are already following ${followeeUsername}`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `you are already following ${followeeUsername}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(200).json({
        message: `you are now following ${followRecord.followee}`,
        followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followerUsername == followeeUsername) {
        return res.status(400).json({
            message: "follower and followee cannot be same"
        })
    }

    const followRecord = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!followRecord) {
        return res.status(200).json({
            message: `you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(followRecord._id)

    res.status(200).json({
        message: `you have unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}