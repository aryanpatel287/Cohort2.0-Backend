const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: [true, "cannot follow without a followee"]
    },
    followee: {
        type: String,
        required: [true, "cannot follow without a followee"]
    }
},
    { timestamps: true }
)

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel