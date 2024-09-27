const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const adminRouter = require('./routes/adminRoutes')
const userRouter = require('./routes/userRoutes')
const connectDB = require('./controllers/dbController')
const cookieParser = require('cookie-parser')

const app = express()

dotenv.config()
const port = process.env.PORT
const db_uri = process.env.MONGO_URI
// const token = process.env.SECRET_ACCESS_TOKEN

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/admin', adminRouter)
app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
    connectDB(db_uri)
})

