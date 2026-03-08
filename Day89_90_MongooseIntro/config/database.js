const mongoose = require('mongoose')

async function connectToDb() {
    await mongoose.connect("<linkplaceholder>")
        .then(() => {
            console.log("Connected to Database")
        })
}

module.exports = connectToDb