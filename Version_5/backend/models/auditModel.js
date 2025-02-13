const mongoose = require('mongoose')
const { Schema } = mongoose

const auditSchema = new Schema({
    body: [],
    user: [],
    path: String
}, {
    timestamps: true
})

const Audit = mongoose.model('Audit', auditSchema)

module.exports = Audit