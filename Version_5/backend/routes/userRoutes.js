const express = require('express')
const router = express.Router()
const Student = require('../models/studentModel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()

router.post('/signup', async (req, res) => {
    try {
        const { regNo, password } = req.body
        if (!regNo || !password) {
            return res.status(400).json({ error: 'Missing Registration Number or Password' })
        }

        const saltRounds = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, saltRounds)
        const newUser = new Student({
            regno: regNo,
            password: hashPwd
        })

        await newUser.save()
        res.status(201).json({ message: 'User Created Successfully', user: newUser })
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error })
    }
    console.log(req.body)
})

router.post('/login', async (req, res) => {
    try {
        const { regNo, password } = req.body
        if (!regNo || !password) {
            return res.status(400).json({ error: 'Missing Registration Number or Password' })
        }

        const user = await Student.findOne({ regno: regNo })
        if (!user) {
            return res.status(400).json({ error: 'User doesn\'t exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or Password' })
        }

        res.status(200).json({ message: 'Login successful', data: regNo })
        console.log(req.body)
    }
    catch (error) {
        res.status(500).json({ error: 'Server Error', details: error })
    }
})

router.post('/data', async (req, res) => {
    try {
        console.log(req)
        const { regno } = req.body
        const user = await Student.findOne({ regno: regno })

        if (user) {
            res.status(200).json({ message: 'User Found', data: user })
        }
        // res.status(200).json({ message: 'Data found' })
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error })
    }
})

module.exports = router