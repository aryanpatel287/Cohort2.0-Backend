const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req, res) {
    const followerUserId = req.user.id
    const followeeUserId = req.params.userId

    if (followerUserId == followeeUserId) {
        return res.status(400).json({
            message: "follower and followee cannot be same"
        })
    }

    const isFolloweeExists = await userModel.findById(followeeUserId)
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: `user: ${followeeUserId} not found`
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUserId,
        followee: followeeUserId
    })
    if (isAlreadyFollowing && (isAlreadyFollowing.status === "accepted" || isAlreadyFollowing.status === "pending")) {
        return res.status(200).json({
            message: `follow request already sent to ${followeeUserId}`,
            followStatus: isAlreadyFollowing.status,
            followRecord: isAlreadyFollowing
        })
    }

    if (isAlreadyFollowing && (isAlreadyFollowing.status === "rejected")) {
        const newFollowRecord = await followModel.findByIdAndUpdate(
            isAlreadyFollowing._id,
            { $set: { 'status': 'pending' } },
            { new: true }
        )

        return res.status(200).json({
            message: "follow request sent successfully",
            newFollowRecord
        })
    }

    const followRecord = await followModel.create({
        follower: followerUserId,
        followee: followeeUserId
    })

    res.status(200).json({
        message: `Follow request sent to ${followRecord.followee}`,
        followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUserId = req.user.id
    const followeeUserId = req.params.userId

    if (followerUserId == followeeUserId) {
        return res.status(400).json({
            message: "follower and followee cannot be same"
        })
    }

    const followRecord = await followModel.findOne({
        follower: followerUserId,
        followee: followeeUserId
    })

    if (!followRecord) {
        return res.status(200).json({
            message: `you are not following ${followeeUserId}`
        })
    }

    //Implement soft delete later on

    if (followRecord.status !== "accepted") {
        return res.status(400).json({
            message: "to unfollow, the follow request must be accepted"
        })
    }

    await followModel.findByIdAndDelete(followRecord._id)

    res.status(200).json({
        message: `you have unfollowed ${followeeUserId}`
    })
}

async function acceptFollowStatusController(req, res) {
    const userId = req.user.id
    const followRecordId = req.params.followRecordId

    const followRecord = await followModel.findById(followRecordId)

    if (!followRecord) {
        return res.status(404).json({
            message: "follow request not found"
        })
    }

    if (!followRecord.followee.equals(userId)) {
        return res.status(403).json({
            message: "you are not allowed to accept this follow request"
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
    const userId = req.user.id
    const followRecordId = req.params.followRecordId

    const followRecord = await followModel.findById(followRecordId)

    if (!followRecord) {
        return res.status(404).json({
            message: "follow request not found"
        })
    }

    if (followRecord.followee !== userId) {
        return res.status(403).json({
            message: "you are not allowed to accept this follow request"
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

async function allFollowRecordsController(req, res) {
    const followerUserId = req.user.id

    const followingRecords = await followModel.find({ follower: followerUserId }).populate("followee").lean()
    const followerRecords = await followModel.find({ followee: followerUserId }).populate("follower").lean()

    const allFollowRecords = {
        followingRecords,
        followerRecords
    }

    res.status(200).json({
        message: "all followee fetched successfully",
        allFollowRecords
    })
}

async function allFollowRequestController(req, res) {
    const followeeUserId = req.user.id

    const allFollowRecords = await followModel.find({ followee: followeeUserId }).populate("follower").lean()

    res.status(200).json({
        message: "all follow requests fetched successfully",
        allFollowRequests: allFollowRecords
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowStatusController,
    rejectFollowStatusController,
    allFollowRecordsController,
    allFollowRequestController
}