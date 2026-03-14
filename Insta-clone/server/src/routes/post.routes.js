const express = require('express')
const postRouter = express.Router()
const multer = require('multer')
const { createPostController } = require('../controllers/post.controller')
const upload = multer({ storage: multer.memoryStorage() })


postRouter.post('/', upload.single("image"), createPostController)

module.exports = postRouter