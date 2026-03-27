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


module.exports = followRoutes