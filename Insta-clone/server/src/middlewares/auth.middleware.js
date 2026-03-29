const jwt = require('jsonwebtoken')

async function identifyUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token not provided, user is not authorized"
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
    req.user = {
        id: decodedToken.userId,
        username: decodedToken.username
    }

    next()
}

module.exports = identifyUser