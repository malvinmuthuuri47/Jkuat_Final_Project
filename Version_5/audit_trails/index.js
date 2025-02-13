const express = require('express')
const dotenv = require('dotenv')
const {join} = require('path')
const {connectDb} = require("./utils/db")
const {logAuditTrails} = require('./middlewares/auditTrail')

dotenv.config({ path: join(__dirname, '.env') })

const app = express()

// middleware
app.use(express.json())
app.use(logAuditTrails)

// dummy routes
app.get('/', (req, res) => res.json({
    success: true,
    message: "Get request sent successfully"
}))

app.post('/', (req, res) => res.json({
    success: true,
    message: "Post request sent successfully"
}))

app.put('/:pet', (req, res) => res.json({
    success: true,
    message: "Put request sent successfully"
}))

app.listen(process.env.PORT, async () => {
    await connectDb()
    console.log("Server running on port " + process.env.PORT)
})