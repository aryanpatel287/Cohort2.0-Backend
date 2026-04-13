const express = require('express')
const userRoutes = express.Router()
const userController = require('../controllers/user.controller')
const identifyUser = require('../middlewares/auth.middleware')

/**
 * @route GET /api/user/get-me
 * @description get details of the logged in user
 * @access Private
 */
userRoutes.get('/get-me', identifyUser, userController.getMeController)

/**
 * @route GET /api/users
 * @description get all users
 * @access Private
 */
userRoutes.get('/', identifyUser, userController.getAllUsersController)

/**
 * @route GET /api/user/get-user/:username
 * @description get details of the requested user
 * @access Private
 */
userRoutes.get('/get-user/:username', identifyUser, userController.getUserController)

module.exports = userRoutes