// Role email Password
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model('Admin', adminSchema)
Admin.createIndexes()

module.exports = Admin