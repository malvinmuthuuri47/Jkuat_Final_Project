const mysql = require('mysql')
require('dotenv').config()


// Connection Pool
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
        return;
    }
    console.log('Connected Successfully as id ' + connection.threadId);
})