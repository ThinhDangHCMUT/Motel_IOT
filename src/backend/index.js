const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mqtt = require('mqtt')
const nodemailer = require('nodemailer');


const app = express();
const brokerUrl = 'ws://broker.mqttdashboard.com:8000/mqtt'
const clientId = 'thinhdang'
const topic = 'motel_data'
// const topic_send = 'motel_cmd'
const client = mqtt.connect(brokerUrl, { clientId })


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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    console.log(username)
    console.log(password)
    connection.query('SELECT * FROM user JOIN Room ON user.UserID = Room.UserID WHERE Username = ? AND Password = ?;', [username, password], (error, results, fields) => {
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
    const roomID = req.params.id;
    let q = `SELECT re.ElectricReading, re.WaterReading, re.ReadingDate, r.roomName, r.roomType, u.Email, u.UserName, u.Phone FROM reading re 
    JOIN room r ON r.RoomID = re.RoomID
    JOIN user u ON u.UserID = r.UserID
    WHERE r.RoomID = ?`
    connection.query(q, [roomID], (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});




app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out');
});

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service of your choice
    auth: {
        user: 'danggiathinhgocong@gmail.com', // Your email address
        pass: 'shzkxbtoyncnkprh' // Your email password
    }
});

// Define the email options
const mailOptions = {
    from: 'danggiathinhgocong@gmail.com', // Sender email address
    to: 'nghianguyen2112002@gmail.com', // Recipient email address
    subject: 'Cảnh báo về độ ẩm', // Subject of the email
    text: 'Chết cây chết cây!!!' // Plain text body of the email
};

// Send the email


let lastMessage = null

client.on('connect', () => {
    console.log('Connected to HiveMQ broker')
    client.subscribe(topic)
})
// Recieve the message from the broker
client.on('message', (topic, message) => {
    var currentdate = new Date();
    var datetime =
        currentdate.getHours() + ":"
        + currentdate.getMinutes()
    console.log(`Received message on topic ${topic}: ${message.toString()}`)
    lastMessage = message.toString().substring(0, message.toString().length - 2)  + `,"date": "${datetime}" }`
    console.log(lastMessage)
    //   if(parseFloat((message.toString()).split(',')[1].split(':')[1]) > 30) {
    //     transporter.sendMail(mailOptions, (error, info) => {
    //       if (error) {
    //         console.error('Could not send email', error);
    //       } else {
    //         console.log('Email sent successfully', info);
    //       }
    //     });
    //   }
})

//Send value 
app.get('/api/value', (req, res) => {
    console.log('Sending data to frontend:', lastMessage)
    res.send(lastMessage)
    // const data = { temperature: 25, humidity: 50 }
    // console.log('Sending data to frontend:', data)
    // // Send the data to the frontend
    // res.send(data)
})

// app.post('/api/data', express.json(), (req, res) => {
//   const message = req.body.data
//   console.log("Button Data: ", message)
//   client.publish(topic_send, message)
//   res.json({ success: true })
// })

// app.post('/api/cmd', express.json(), (req, res) => {
//   const message = req.body.data
//   console.log("Button Data from front end: ", message)
//   client.publish(topic, message)
//   res.json({ success: true })
// })



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
