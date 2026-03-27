require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())



const authRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const followRouter = require('./routes/follow.route')


app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api', followRouter)

module.exports = app