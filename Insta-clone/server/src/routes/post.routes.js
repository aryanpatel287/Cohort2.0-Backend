const express = require('express')
const postRoutes = express.Router()
const multer = require('multer')
const postController = require('../controllers/post.controller')
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middlewares/auth.middleware')

/**
 * @route POST /api/posts/
 * @description Create a post
 * @access Private
 */
postRoutes.post('/', identifyUser, upload.single("image"), postController.createPostController)


/**
 * @route GET /api/posts/
 * @description Get all posts created by user
 * @access Private
 */
postRoutes.get('/', identifyUser, postController.getPostsController)


/**
 * @route GET /api/posts/details/:postId
 * @description Get all details of a post created by user
 * @access Private
 */
postRoutes.get('/details/:postId', identifyUser, postController.getPostDetailsController)


/**
 * @route POST /api/posts/like/:postId
 * @description Like a post by using postId 
 * @access Private
 */
postRoutes.post('/like/:postId', identifyUser, postController.likePostController)


/**
 * @route POST /api/posts/feed
 * @description Get all existing posts in the database 
 * @access Private
 */
postRoutes.get('/feed', identifyUser, postController.getFeedController)

module.exports = postRoutes