const express = require('express');
const authRoutes = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

/**
 * @route POST /api/auth/register
 * @description Register a user
 * @access Public
 */

authRoutes.post('/register', authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description login a user
 * @access Public
 */

authRoutes.post('/login', authController.loginUserController)


/**
 * @route POST /api/auth/logout
 * @description logout a user
 * @access Private
 */

authRoutes.post('/logout', authMiddleware.authUser, authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the details of the user send the request
 * @access Private
 */

authRoutes.get('/get-me', authMiddleware.authUser, authController.getMeController)


module.exports = authRoutes