const express = require('express')
const followRoutes = express.Router()
const identifyUser = require('../middlewares/auth.middleware')
const followController = require('../controllers/follow.controller')

/**
 * @route POST /api/follow/:userId
 * @description Follow a user
 * @access Private
 */
followRoutes.post('/follow/:userId', identifyUser, followController.followUserController)


/**
 * @route POST /api/unfollow/:userId
 * @description Unfollow a user
 * @access Private
 */
followRoutes.post('/unfollow/:userId', identifyUser, followController.unfollowUserController)


/**
 * @route GET /api/follow/allfollowrecords
 * @description Get all follow records in records where follower is the current user
 * @access Private
 */
followRoutes.get('/follow/all-follow-records', identifyUser, followController.allFollowRecordsController)


/**
 * @route GET /api/follow/requests
 * @description Get all follow request received by the user
 * @access Private
 */
followRoutes.get('/follow/requests', identifyUser, followController.allFollowRequestController)


/**
 * @route PATCH /api/follow/requests/accept/:followRecordId
 * @description Update the existing follow record's status from pending to accepted
 * @access Private
 */
followRoutes.patch('/follow/requests/accept/:followRecordId', identifyUser, followController.acceptFollowStatusController)


/**
 * @route PATCH /api/follow/requests/reject/:followRecordId
 * @description Update the existing follow record's status from pending to rejected
 * @access Private
 */
followRoutes.patch('/follow/requests/reject/:followRecordId', identifyUser, followController.rejectFollowStatusController)


module.exports = followRoutes