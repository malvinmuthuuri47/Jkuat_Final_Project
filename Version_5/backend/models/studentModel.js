// Reg_no, password, subjects, fees
const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regno: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    subjects: [
        subjectSchema
    ]
}, { timestamps: true })

const Student = mongoose.model('Student', studentSchema)
Student.createIndexes()

module.exports = Student