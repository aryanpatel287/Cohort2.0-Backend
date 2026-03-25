const express = require('express')
const postRoutes = express.Router()
const multer = require('multer')
const postController = require('../controllers/post.controller')
const upload = multer({ storage: multer.memoryStorage() })

//POST /api/posts [protected]
postRoutes.post('/', upload.single("image"), postController.createPostController)

//GET /api/posts [protected]
postRoutes.get('/', postController.getPostController)

postRoutes.get('/details/:postId', postController.getPostDetailsController)

module.exports = postRoutes