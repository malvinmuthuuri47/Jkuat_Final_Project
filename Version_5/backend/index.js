const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const adminRouter = require('./routes/adminRoutes')
const userRouter = require('./routes/userRoutes')
const connectDB = require('./controllers/dbController')
const cookieParser = require('cookie-parser')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
})

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

// RegNo and socketId map
const regNoToSocketMap = new Map()

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    socket.on('user registration', (userreg) => {
        console.log(`User registration no: ${userreg}`)
        regNoToSocketMap.set(userreg, socket.id)
        console.log(`Registered ${userreg} to ${socket.id}`)
    })

    socket.on('admin message', ({ message, regno }) => {
        const targetSocketId = regNoToSocketMap.get(regno)

        if (targetSocketId) {
            io.to(targetSocketId).emit('messageFromAdmin', message)
        } else {
            console.log(`No user with ${regno} exists`)
        }
        console.log(`The admin message: ${JSON.stringify(message)}`)
        socket.emit('notification', message)
    })


    // socket.on('disconnect', (userreg) => {
    //     console.log(`User registration: ${userreg} disconnected`)
    // })
    
})

httpServer.listen(port, () => {
    console.log(`App running on port: ${port}`)
    connectDB(db_uri)
})

