import express from 'express';
import authRouter from '../Authentication/Auth.js';

const router = express.Router();
router.use('/', authRouter);

// router.post('/', (req, res) => {
//     res.send('Admin login page');
//     // res.render('adminLogin);
//     console.log(req.body);
// })

// // Admin Dashboard
// router.get('/dashboard', (req, res) => {
//     res.send('Admin Dashboard')
//     // res.render('adminDashboard);
// })

export default router;