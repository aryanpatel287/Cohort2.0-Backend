const express = require('express')
const postRoutes = express.Router()
const multer = require('multer')
const postController = require('../controllers/post.controller')
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middlewares/auth.middleware')

//POST /api/posts [protected]
postRoutes.post('/', identifyUser, upload.single("image"), postController.createPostController)

//GET /api/posts [protected]
postRoutes.get('/', identifyUser, postController.getPostController)

postRoutes.get('/details/:postId', identifyUser, postController.getPostDetailsController)

module.exports = postRoutes