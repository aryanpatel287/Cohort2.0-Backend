const express = require('express')
const authRoutes = express.Router()
const authController = require('../controllers/auth.controller')
const identifyUser = require('../middlewares/auth.middleware')

/**
 * @route POST /api/auth/register
 * @description register a user
 * @access Public
 */
authRoutes.post('/register', authController.registerController)


/**
 * @route POST /api/auth/login
 * @description login a user
 * @access Public
 */
authRoutes.post('/login', authController.loginController)


/**
 * @route GET /api/auth/get-me
 * @description get details of the logged in user
 * @access Private
 */
authRoutes.get('/get-me', identifyUser, authController.getMeController)

module.exports = authRoutes