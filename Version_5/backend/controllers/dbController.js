const mongoose = require('mongoose')

const connectDB = async (db_uri) => {
    try {
        await mongoose.connect(db_uri)
        console.log('Connected to MongoDb Successfully.')
    } 
    catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
    // finally {
    //     mongoose.connection.on('error', err => {
    //         console.log(err)
    //     })
    // }
}

module.exports = connectDB