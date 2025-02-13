const mongoose = require('mongoose')
const {join} = require('path')

require("dotenv").config({
    path: join(__dirname, '..', '.env')
})

exports.connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Successfully connected to Db")
    }
    catch (err) {
        console.log("An error occurred")
        console.log(err.message)
    }
}