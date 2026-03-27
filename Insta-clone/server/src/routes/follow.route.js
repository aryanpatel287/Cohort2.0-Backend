const express = require('express')
const followRoutes = express.Router()
const identifyUser = require('../middlewares/auth.middleware')
const followController = require('../controllers/follow.controller')

/**
 * @route POST /api/follow/:username
 * @description Follow a user
 * @access Private
 */
followRoutes.post('/follow/:username', identifyUser, followController.followUserController)


/**
 * @route POST /api/unfollow/:username
 * @description Unfollow a user
 * @access Private
 */
followRoutes.post('/unfollow/:username', identifyUser, followController.unfollowUserController)


/**
 * @route PATCH /api/follow/status/accept/:followRecordId
 * @description Update the existing follow record's status from pending to accepted
 * @access Private
 */
followRoutes.patch('/follow/status/accept/:followRecordId', identifyUser, followController.acceptFollowStatusController)


/**
 * @route PATCH /api/follow/status/reject/:followRecordId
 * @description Update the existing follow record's status from pending to rejected
 * @access Private
 */
followRoutes.patch('/follow/status/reject/:followRecordId', identifyUser, followController.rejectFollowStatusController)


module.exports = followRoutes