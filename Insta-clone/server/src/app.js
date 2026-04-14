require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const allowedOrigins = (process.env.CLIENT_ORIGINS)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: allowedOrigins
}))

const clientBuildPath = path.join(__dirname, 'public')
app.use(express.static(clientBuildPath))

const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const followRouter = require('./routes/follow.routes')
const appRouter = require('./routes/app.routes')


app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api', followRouter)
app.use('/', appRouter)


module.exports = app