const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
app.use(express.urlencoded({extended: true}));

// Templating Engine
app.engine('hbs', engine());
app.set('view engine', 'hbs');

app.listen(port, () => {
    console.log(`App running on Port ${port}`);
});