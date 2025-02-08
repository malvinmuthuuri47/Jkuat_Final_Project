const express = require('express')
const router = express.Router()
const Admin = require('../models/adminModel')
const Student = require('../models/studentModel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const sanitize = require('mongo-sanitize')
const { createTokens, validateToken, deleteToken } = require('../jwt/jwt')

dotenv.config()


// router.post('/', (req, res) => {
//     res.send('Received a Post request on the Root route')
//     console.log(req.body)
// })

router.post('/signup', async (req, res) => {
    // res.send('Posted to /AdminLogin')
    try {
        // destructure the params from frontend and create an admin in the database using them
        const { email , password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({ error: 'Missing email, password, or role' })
        }

        const saltRounds = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, saltRounds)
        const newAdmin = new Admin({
            role,
            email, 
            password: hashPwd
        })

        await newAdmin.save()
        res.status(201).json({ message: 'Admin created Successfully', admin: newAdmin })
    }
    catch (error) {
        res.status(500).json({ error: 'Server Error', details: error })
    }
    console.log(req.body)
})

router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body
        // const { email, password, role } = sanitize(req.body)
        if (!email || !password || !role) {
            return res.status(400).json({ error: 'Missing Registration Number or Password' })
        }

        const admin = await Admin.findOne({ email: email })
        if (!admin) {
            return res.status(400).json({ error: 'Admin doesn\'t exist'})
        }

        // const isMatch = await bcrypt.compare(password, admin.password)
        // if (!isMatch) {
        //     return res.status(400).json({ error: 'Invalid email or Password' })
        // }

        const { accessToken } = createTokens(admin)
        const { refreshToken } = createTokens(admin)
        res.cookie("access-token", accessToken, {
            httpOnly: true,
            path: '/',
            secure: 'true',
            sameSite: 'None'
        })
        res.cookie("refresh-token",refreshToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
            path: '/',
            secure: 'true',
            sameSite: 'None'
        })
        // res.status(200).json({ message: 'Login Successful', email })
        res.status(200).json({ message: 'Login Successful', admin })
        console.log(req.body)
    } 
    catch (error) {
        res.status(500).json({ error: 'Server Error', detail: error })
    }
})

router.post('/users', validateToken, async (req, res) => {
    try {
        const { name, regNo, password, fees, subjects } = req.body
    
        const saltRounds = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, saltRounds)
    
        const newUser = new Student({
            name: name,
            regno: regNo,
            password: hashPwd,
            fees,
            subjects
        })
    
        await newUser.save()
        res.status(201).json({ message: 'User created by Admin', user: newUser })
    
        // res.status(200).json({ data: users })
    } 
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error })
        }
        res.status(500).json({ message: 'Server Error', details: error })
    }
})

router.get('/users', validateToken, async (req, res) => {
    try {
        console.log(req.headers)
        const users = await Student.find()
        if (!users) {
            return res.status(400).json({ error: 'No Users Found' })
        }
        res.status(200).json({ message: 'Data from db', details: users })
    }
    catch (error) {
        res.status(500).json({ message: "Error in getting user details", error })
    }
})

router.get('/users/:regno', validateToken, async (req, res) => {
    try {
        console.log(req.params)
        const { regno } = req.params
    
        const user = await Student.findOne({regno})
        if (!user) {
            return res.status(400).json({ error })
        }
    
        res.status(200).json({ message: 'User found', user })
        // const user = await Student.find
    }
    catch (error) {
        res.status(500).json({ message: "The users/regno route has a problem", error })
    }
})

router.post('/users/:regno', validateToken, async (req, res) => {
    const { name, fees, subjects } = req.body
    const { regno } = req.params
    const updateFields = {}

    if (name) updateFields.name = name
    if (fees) updateFields.fees = fees

    if (subjects && subjects.length > 0) updateFields.subjects = subjects

    try {
        const updatedUser = await Student.findOneAndUpdate(
            { regno },
            { $set: updateFields },
            { new: true} 
        )

        if (!updatedUser) {
            return res.status(400).json({ error: 'User not found' })
        }

        res.status(200).json({ message: 'User Found Successfully', details: updatedUser })
    }
    catch (error) {
        res.status(500).json({ error: 'Server Error', details: error })
    }
})

router.delete('/users/:regno', validateToken, async (req, res) => {
    const { regno } = req.params
    const user = await Student.findOneAndDelete({ regno })

    if (!user) {
        res.status(400).json({ error: 'The user doesn\'t exist' })
    }
    res.status(200).json({ message: 'Successfully Deletes user' })
})

router.post('/logout', validateToken, deleteToken, async (req, res) => {
    try {
        res.status(200).json({ message: "You've successfully reached the endpoint" })
    }
    catch (error) {
        res.send(500).json({ message: "An error occurred", error })
    }
})

module.exports = router;