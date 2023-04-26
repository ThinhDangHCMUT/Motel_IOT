const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mqtt = require('mqtt')
const nodemailer = require('nodemailer');
const userRoute = require('./routes/user')


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());


app.use('', userRoute)


//**********************MQTT CONNECTION********************************* */
const brokerUrl = 'ws://broker.mqttdashboard.com:8000/mqtt'
const clientId = 'thinhdang'
const topic = 'motel_data'
const client = mqtt.connect(brokerUrl, { clientId })


client.on('connect', () => {
    console.log('Connected to HiveMQ broker')
    client.subscribe(topic)
})

let lastMessage = null
// Recieve the message from the broker
client.on('message', (topic, message) => {
    var currentdate = new Date();
    var datetime =
        currentdate.getHours() + ":"
        + currentdate.getMinutes()
    console.log(`Received message on topic ${topic}: ${message.toString()}`)
    lastMessage = message.toString().substring(0, message.toString().length - 2) + `,"date": "${datetime}" }`
    console.log(lastMessage)
})

//Send value 
app.get('/api/value', (req, res) => {
    console.log('Sending data to frontend:', lastMessage)
    res.send(lastMessage)
})


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
