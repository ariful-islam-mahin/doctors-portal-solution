const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lmoae.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('addedDoctors'));
app.use(fileUpload());

const serviceAccount = require("./doctors-portal0-firebase-adminsdk-m0imp-940456bc50.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://doctors-portal0.firebaseio.com"
});

app.get('/', (req, res) => {
    res.send("hello from db it's working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const appointmentCollection = client.db("doctorsPortal").collection("appointments");
    const doctorCollection = client.db("doctorsPortal").collection("addedDoctors");

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

    app.post('/addDoctor', (req, res) => {
        const file = req.files.file;
        
        const name = req.body.name;
        const email = req.body.email;
        console.log(name, email, file);
        file.mv(`${__dirname}/addedDoctors/${file.name}`, err => {
            if(err){
                console.log(err);
                return res.status(500).send({msg: 'Failed to upload image'})
            }
            doctorCollection.insertOne({name, email, img:file.name})
            // return res.send({name: file.name, path: `/${file.name}`})
        })
    })

    app.get('/doctors', (req, res) => {
        doctorCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })
});

app.listen(process.env.PORT || 5000)
