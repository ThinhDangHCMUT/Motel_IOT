const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D@ngthinh1402',
    database: 'motel_schema2'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// const isAuthenticated = (req, res, next) => {
//     if (req.session.user) {
//         return next();
//     } else {
//         res.status(401).send('Unauthorized');
//     }
// }

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM User WHERE Username = ? AND Password = ?', [username, password], (error, results, fields) => {
        if (results.length > 0) {
            const user = results[0];
            req.session.user = user;
            res.send(user);
        } else {
            res.status(401).send('Invalid username or password!');
        }
    });
});

app.get('/rooms', (req, res) => {
    connection.query('SELECT RoomID, RoomName, FullName, Phone, RoomType FROM Room r INNER JOIN User u ON r.UserID = u.UserID', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/room/:id', (req, res) => {
    const userID = req.params.id;
    connection.query('SELECT * FROM Room WHERE UserID = ?', [userID], (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
});

app.get('/readings/:id', (req, res) => {
    const roomID = req.params.id;
    connection.query('SELECT * FROM Reading WHERE RoomID = ?', [roomID], (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
