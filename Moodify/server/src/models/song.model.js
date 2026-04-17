const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "Song url is required"]
    },
    posterUrl: {
        type: String,
        required: [true, "Post url is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    mood: {
        type: String,
        required: [true, "mood is required"],
        enum: {
            values: ["sad", "happy", "surprised"]
        }
    }
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel