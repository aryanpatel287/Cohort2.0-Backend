const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_ORIGINS,
    credentials: true
}))


/**
 * Routes
 */
const authRouter = require('./routes/auth.routes')
const songRouter = require('./routes/song.routes')

app.use('/api/auth', authRouter)
app.use('/api/songs', songRouter)

module.exports = app;