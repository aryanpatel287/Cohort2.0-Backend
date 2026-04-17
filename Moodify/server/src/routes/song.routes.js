const express = require('express')
const upload = require('../middlewares/upload.middleware')
const songRoutes = express.Router()
const songController = require('../controllers/song.controller')

/**
 * @route /api/songs/
 * @description upload a song 
 * @access Public
 */
songRoutes.post('/', upload.single("song"), songController.uploadSongController)


/**
 * @route /api/songs/
 * @description upload a song 
 * @access Public
 */
songRoutes.get('/', songController.getSongController)


module.exports = songRoutes