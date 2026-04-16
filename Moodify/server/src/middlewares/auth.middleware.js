const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')
const redis = require('../config/cache')

async function authUser(req, res, next) {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "token not provided to the user requesting"
        })
    }

    const isTokenBlacklisted = await redis.get(token)
    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decodedToken
        console.log("auth middleware done", req.user)
        return next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    authUser
}