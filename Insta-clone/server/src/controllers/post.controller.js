const postModel = require('../models/post.model')
const jwt = require('jsonwebtoken')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    console.log(req.body, req.file)

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "user is not authorized"
        })
    }

    let decodedToken = null
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "user is not authorized"
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'Test',
        folder: "/cohort2-backend-insta-clone/posts"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decodedToken.userId
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
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    let decodedToken = null;
    try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }

    const userId = decodedToken.userId
    const posts = await postModel.find({ user: userId })

    res.status(200).json({
        message: "posts getched successfuly",
        posts
    })
}

async function getPostDetailsController(req, res) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "unauthorized accesss"
        })
    }

    let decodedToken = null
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }

    const userId = decodedToken.userId;
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

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}