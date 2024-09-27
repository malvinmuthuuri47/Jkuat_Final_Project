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

        const saltRounds = parseInt(process.env.saltRounds, 10)
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

        res.status(200).json({ message: 'Login successful' })
        console.log(req.body)
    }
    catch (error) {
        res.status(500).json({ error: 'Server Error', details: error })
    }
})

module.exports = router