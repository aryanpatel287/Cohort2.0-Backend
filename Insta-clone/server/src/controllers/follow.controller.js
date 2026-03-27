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

    const isFolloweeExists = await userModel.findOne({ username: followeeUsername })
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: `user: ${followeeUsername} not found`
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

async function acceptFollowStatusController(req, res) {
    const followRecordId = req.params.followRecordId

    const followRecord = await followModel.findById(followRecordId)

    if (!followRecord) {
        return res.status(404).json({
            message: "follow request not found"
        })
    }

    if (followRecord.status == "rejected") {
        return res.status(400).json({
            message: "cannot accept, follow request is already rejected"
        })
    }

    if (followRecord.status == "accepted") {
        return res.status(200).json({
            message: "follow request is already accepted"
        })
    }

    const newFollowRecord = await followModel.findByIdAndUpdate(
        followRecordId,
        { $set: { 'status': 'accepted' } },
        { new: true }
    )

    res.status(200).json({
        message: "follow request accepted",
        newFollowRecord: {
            follower: newFollowRecord.follower,
            followee: newFollowRecord.followee,
            status: newFollowRecord.status
        }
    })
}

async function rejectFollowStatusController(req, res) {
    const followRecordId = req.params.followRecordId

    const followRecord = await followModel.findById(followRecordId)

    if (!followRecord) {
        return res.status(404).json({
            message: "follow request not found"
        })
    }

    if (followRecord.status == "accepted") {
        return res.status(400).json({
            message: "cannot reject, follow request is already accepted"
        })
    }

    if (followRecord.status == "rejected") {
        return res.status(200).json({
            message: "follow request is already rejected"
        })
    }

    const newFollowRecord = await followModel.findByIdAndUpdate(
        followRecordId,
        { $set: { 'status': 'rejected' } },
        { new: true }
    )

    res.status(200).json({
        message: "request rejected successfully",
        newFollowRecord: {
            follower: newFollowRecord.follower,
            followee: newFollowRecord.followee,
            status: newFollowRecord.status
        }
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowStatusController,
    rejectFollowStatusController
}