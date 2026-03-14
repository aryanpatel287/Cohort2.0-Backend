const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        required: [true, "Image url is required to create a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Post can only be created by registered user"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel