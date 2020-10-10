const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lmoae.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello from db it's working")
})

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const appointmentCollection = client.db("doctorsPortal").collection("appointments");

    app.post('/addAppointment', (req, res) => {
        const appointment = req.body;
        appointmentCollection.insertOne(appointment)
        .then(result => {
            res.send(result.insertedCount)
        })
    })

    app.post('/appointmentByDate', (req, res) => {
        const date = req.body;
        appointmentCollection.find({date: date.date})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/appointments', (req, res) => {
        appointmentCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })
});

app.listen(process.env.PORT || 5000)
