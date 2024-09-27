const express = require('express')
const router = express.Router()
const Admin = require('../models/adminModel')
const Student = require('../models/studentModel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const { createTokens, validateToken } = require('../jwt/jwt')

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

        const saltRounds = parseInt(process.env.saltRounds, 10)
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
        if (!email || !password || !role) {
            return res.status(400).json({ error: 'Missing Registration Number or Password' })
        }

        const admin = await Admin.findOne({ email: email })
        if (!admin) {
            return res.status(400).json({ error: 'Admin doesn\'t exist'})
        }

        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or Password' })
        }

        const { accessToken } = createTokens(admin)
        const { refreshToken } = createTokens(admin)
        res.cookie("access-token", accessToken, {
            httpOnly: true,
            secure: true
        })
        res.cookie("refresh-token",refreshToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
            secure: true
        })
        res.status(200).json({ message: 'Login Successful' })
        console.log(req.body)
    } 
    catch (error) {
        res.status(500).json({ error: 'Server Error', detail: error })
    }
})

router.post('/users', async (req, res) => {
    try {
        const { name, regNo, password, fees, subjects } = req.body
    
        const saltRounds = parseInt(process.env.saltRounds, 10)
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

router.get('/users', async (req, res) => {
    const users = await Student.find()
    if (!users) {
        return res.status(400).json({ error: 'No Users Found' })
    }
    res.status(200).json({ message: 'Data from db', details: users })
})

router.get('/users/:regno', async (req, res) => {
    console.log(req.params)
    const { regno } = req.params

    const user = await Student.findOne({regno})
    if (!user) {
        return res.status(400).json({ error })
    }

    res.status(200).json({ message: 'User found', user })
    // const user = await Student.find
})

router.post('/users/:regno', async (req, res) => {
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

module.exports = router;