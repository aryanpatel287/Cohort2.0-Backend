const express = require('express')
const authRoutes = express.Router()
const authController = require('../controllers/auth.controller')

//POST /api/auth/register
authRoutes.post('/register',authController.registerController)

//POST /api/auth/login
authRoutes.post('/login',authController.loginController)

module.exports = authRoutes