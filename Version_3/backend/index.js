const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// const bodyParser = require('body-parser')

const app = express()
const routes = require('./routes/route.js')

dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server started on Port no. ${PORT}`);
})

mongoose.connect(process.env.Mongo_URI)
.then(console.log("Connected to MongoDb"))
.catch((err) => {console.log(err)})