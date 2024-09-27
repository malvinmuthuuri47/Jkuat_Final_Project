import { Course, Lecturer } from '../models/CourseModel.js'
import { User, Student } from '../models/userModel.js'
import Admin from '../models/adminModel.js'
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

// Connecting to MongoDb
const mongoURI = process.env.Mongo_URI

const connection = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log('Connected to MongoDb Database')
    } catch (err) {
        console.error('Error connecting to MongoDb', err.message)
    }
}

connection();

// Admin Landing Page
router.get('/landingPage', (req, res) => {
    const pageData = {
        title: "Admin Sign Up page"
    }
    res.render('createAdmin', pageData);
})

// Creating an admin
router.post('/landingPage', async (req, res) => {
    try {
        const { adminName, adminEmail, adminPassword } = req.body;
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
        
        const newadmin = new Admin({
            name: adminName,
            email: adminEmail,
            password: hashedPassword
        });

        const existingUser = await Admin.findOne({ email: adminEmail });

        if (existingUser) {
            return res.status(400).json({ message: "Email already in Use. Please choose another one" });
        }
        
        const savedAdmin = await newadmin.save();
        console.log('Admin Created Successfully.', savedAdmin);
        res.redirect('adminDashboard');
    } catch (error) {
        console.error('Error creating admin', error.message);
    }
})

// Logging in as an admin
router.route('/login')
.get((req, res) => {
    const pageData = {
        title: "Admin login Page"
    }
    res.render('adminLogin', pageData);
})
.post(async (req, res) => {
    console.log(req.body);
    const { adminEmail, adminPassword } = req.body;

    try {
        const user = await Admin.findOne({ email: adminEmail });

        if (!user) {
            // Return user to the login page and give them that nice feedback error
            return res.status(401).send('User doens\'t exist');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(adminPassword, user.password)

        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        // // Generate JWT token
        // const accessToken = jwt.sign({ id: user._id.toString() }, process.env.SECRET_ACCESS_TOKEN);

        // // console.log({ access_token: accessToken });
        // res.cookie('jwt', accessToken, { httpOnly: true }).redirect('/admin/adminDashboard');
        res.redirect('/admin/adminDashboard');
    } catch (err) {
        console.error('Login error', err);
        res.status(500).send('Server Error')
    }
});


router.route('/adminDashboard')
.get((req, res) => {
    const data = {
        title: "Admin Dashboard"
    }
    res.render('adminDashboard', data)
})


export default router;