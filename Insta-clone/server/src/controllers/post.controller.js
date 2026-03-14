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
        folder:"/cohort2-backend-insta-clone/posts"
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


module.exports = { createPostController }