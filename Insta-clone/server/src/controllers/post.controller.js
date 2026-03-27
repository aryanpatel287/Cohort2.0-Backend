const postModel = require('../models/post.model')
const likeModel = require('../models/like.model');

const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'Test',
        folder: "/cohort2-backend-insta-clone/posts"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: req.user.id
    })

    res.status(200).json({
        message: "post created successfully",
        post: {
            caption: post.caption,
            imageUrl: post.imageUrl
        }
    })
}

async function getPostController(req, res) {

    const userId = req.user.id
    const posts = await postModel.find({ user: userId })

    res.status(200).json({
        message: "posts getched successfuly",
        posts
    })
}

async function getPostDetailsController(req, res) {

    const userId = req.user.id;
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if (!post) {
        return res.status(404).json({
            message: "post not found"
        })
    }
    const isValidUser = post.user.toString() === userId
    if (!isValidUser) {
        return res.status(403).json({
            message: "forbidden content"
        })
    }

    res.status(200).json({
        message: "post fetched successfully",
        post: {
            caption: post.caption,
            imageUrl: post.imageUrl
        }
    })
}

async function likePostController(req, res) {
    const user = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: user
    })
    if (isAlreadyLiked) {
        return res.status(200).json({
            message: "post is already liked"
        })
    }

    const likeRecord = await likeModel.create({
        post: postId,
        user: user
    })

    res.status(200).json({
        message: "liked post successfully"
    })
}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}