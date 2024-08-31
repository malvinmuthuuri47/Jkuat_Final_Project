const express = require('express');
const { engine } = require('express-handlebars');
// const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./server/routes/user');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
app.use(express.urlencoded({extended: true}));

// Path to the views Directory
// app.set('views', path.join(__dirname, 'server/views'))

// Templating Engine
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout:'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');

app.use('/', routes);

app.listen(port, (req, res) => {
    console.log(`App running on Port ${port}`);
});