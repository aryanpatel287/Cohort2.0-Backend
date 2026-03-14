const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username is already taken"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Email is already registered"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    bio: String,
    profile_image: {
        type: String,
        default: "https://ik.imagekit.io/ji8wynr3i/userImage.avif"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel