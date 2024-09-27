import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import adminrouter from './routes/admin.js';
import userrouter from './routes/user.js'

dotenv.config();

const port = process.env.PORT;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Templating Engine
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout:'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Routes
app.use('/user', userrouter);
app.use('/admin', adminrouter);

app.get('/', (req, res) => {
    res.redirect('user/signup');
})

app.listen(port, (err, rep) => {
    if (!err) {
        console.log(`Connected Successfully on Port ${port}`);
    } else {
        console.error(err);
    }
});