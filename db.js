const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const URI = process.env.URI || "mongodb+srv://bharatchandora:ihatepassword@cluster0.xfnd9sv.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URI)

const db = mongoose.connection
db.on("error", console.error.bind(console, "Connection error: "))
db.once("open", () => {
    console.log("DB Connected successfully")
})



module.exports = db