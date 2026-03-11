const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: String,
    userEmail: {
        type:String,
        unique:[true,"An account with this email already exists."]
    },
    userPassword: String
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel