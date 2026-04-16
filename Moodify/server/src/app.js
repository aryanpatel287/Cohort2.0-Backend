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

const authRouter = require('./routes/auth.routes')


app.use('/api/auth', authRouter)


module.exports = app;