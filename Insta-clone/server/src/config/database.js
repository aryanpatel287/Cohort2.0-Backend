const mongoose=require('mongoose')

async function connectToDb(){
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not set in environment variables')
    }

    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Database")
}

module.exports=connectToDb