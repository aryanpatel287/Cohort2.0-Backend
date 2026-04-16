const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to database')
    } catch (error) {
        console.log("Error connecting to DB", error);
    }
}

module.exports = connectToDb;