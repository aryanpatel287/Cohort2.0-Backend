const app = require('./src/app')
const mongoose = require('mongoose')

async function connectToDb() {
    await mongoose.connect("mongodb+srv://aryanpatelme_db_user:Aryan2878980Patel@cluster0.dotjri5.mongodb.net/Day6")
        .then(() => {
            console.log("Connected to Database")
        })
}
connectToDb()

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

