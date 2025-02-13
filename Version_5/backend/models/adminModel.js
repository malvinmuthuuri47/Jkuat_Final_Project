// Role email Password
const mongoose = require('mongoose')
const { format } = require('date-fns')

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
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


const Admin = mongoose.model('Admin', adminSchema)
Admin.createIndexes()

module.exports = Admin