import express from 'express';
import authRouter from '../Authentication/Auth.js'

const router = express.Router();

// Signup
router.get('/signup', (req, res) => {
    // res.send('User signup page');
    res.render('userSignup', { layout: 'main' });
})


export default router;