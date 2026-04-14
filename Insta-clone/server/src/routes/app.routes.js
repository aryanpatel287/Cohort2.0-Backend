const express = require('express')
const appRoutes = express.Router()
const appController = require('../controllers/app.controller')

/**
 * @route GET /*
 * @description Redirect user to client on all non-api urls
 * @access Public
 */
appRoutes.get(/^(?!\/(api|assets)\/).*/, appController.redirectUserToClient)

module.exports = appRoutes
