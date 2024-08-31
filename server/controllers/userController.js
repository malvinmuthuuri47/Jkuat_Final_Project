const mysql = require('mysql')
require('dotenv').config()


// Connection Pool
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

// View Users
exports.view = (req, res) => {
    connection.query('SELECT * FROM student WHERE status = "active" LIMIT 5', (err, rows) => {
        if (!err) {
            let removedUser = req.query.removed;
            res.render('home', { rows, removedUser });
        } else {
            console.log(err);
        }
        console.log('The data from the students table: \n', rows);
    });
}

// View Result
exports.views = (req, res) => {
    connection.query('SELECT DISTINCT id FROM result ORDER BY id LIMIT 5', (err, rows) => {
        if (!err) {
            let removedUser = req.query.removed;
            res.render('result', { rows, removedUser });
        } else {
            console.log(err);
        }
        console.log('The data from result table: \n', rows);
    });
}

// Find User by Search
exports.find = (req, res) => {
    let searchTerm = req.body.search;

    connection.query('SELECT * FROM student WHERE id LIKE ? OR name LIKE ? OR gender LIKE ? OR department LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
        if (rows == 0) {
            res.render('home', { alert: 'Student Not Found.' });
        } else if (!err) {
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from student table: \n', rows);
    });
}

exports.finds = (req, res) => {
    let searchTerm = req.body.sr;

    connection.query('SELECT DISTINCT id FROM result WHERE id LIKE ?', ['%' + searchTerm + '%' ], (err, rows) => {
        if (rows == 0) {
            res.render('result', { alert: 'Result Not Found.' })
        } else if (!err) {
            res.render('result', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from result table: \n', rows);
    });
}

exports.form = (req, res) => {
    res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
    const { id, name, batch, gender, department, phone, email } = req.body;
    let searchTerm = req.body.search;
    
    connection.query('INSERT INTO student SET id = ?, name = ?, batch = ?, gender = ?, department = ?, phone = ?, email = ?', [id, name, batch, gender, deparment, phone, email], (err, rows) => {
        if (!err) {
            res.render('add-user', { alert: 'Student added successfully.' });
        } else {
            console.log(err);
        }
        console.log('The data from the student table: \n', rows);
    });
}

exports.forms = (req, res) => {
    res.render('add-result');
}

// Add new result
exports.creates = (req, res) => {
    const { id, semester, cgpa } = req.body;
    let searchTerm = req.body.search;

    connection.query('INSERT INTO result SET id = ?, semester = ?, cgpa = ?', [id, semester, cgpa], (err, rows) => {
        if (!err) {
            res.render('add-result', { alert: 'Result Added Successfully.' });
        } else {
            console.error(err);
        }
        console.log('The data from results table: \n', rows);
    });
}

// Edit user
exports.edit = (req, res) => {
    connection.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('edit-user', { rows });
        } else {
            console.error(err);
        }
        console.log('The data from students table: \n');
    });
}

// Update user
exports.update = (req, res) => {
    const { id, name, batch, gender, department, phone, email } = req.body;

    connection.query('UPDATE student SET id = ?, name = ?, batch = ?, gender = ?, department = ?, phone = ?, email = ? WHERE id = ?', [ id, name, batch, gender, deparment, phone, email, req.params.id ], (err, rows) => {
        if (!err) {
            connection.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, rows) => {
                if (!err) {
                    res.render('edit-user', {rows, alert: `${name} has been updated.`});
                } else {
                    console.error(err);
                }
                console.log('The data from students table: \n', rows);
            });
        } else {
            console.error(err);
        }
        console.log('The data from students table: \n', rows);
    });
}

// Delete user
exports.delete = (req, res) => {
    connection.query('DELETE FROM student WHER id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.redirect('/');
        } else {
            console.error(err);
        }
        console.log('The data from student table: \n', rows);
    });
}

// View users
exports.viewall = (req, res) => {
    connection.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('view-user', { rows });
        } else {
            console.error(err);
        }
        console.log('The data from student table: \n', rows);
    });
}

// View Results by id
exports.viewalls = (req, res) => {
    connection.query('SELECT * FROM students NATURAL JOIN result WHERE id = ? ORDER BY semester', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('view-result', { rows });
        } else {
            console.error(err);
        }
        console.log('The data from result table \n', rows);
    });
}

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database', err.stack);
//         return;
//     }
//     console.log('Connected Successfully as id ' + connection.threadId);
// })