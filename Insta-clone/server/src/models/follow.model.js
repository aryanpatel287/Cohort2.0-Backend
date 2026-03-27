const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: [true, "cannot follow without a followee"]
    },
    followee: {
        type: String,
        required: [true, "cannot follow without a followee"]
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted or rejected"
        }
    }
},
    { timestamps: true }
)

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel