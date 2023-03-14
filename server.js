const express = require('express');
require('ejs');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const apiKey = process.env.API_KEY;

const app = express();
const port = 5500;

app.use(express.static('./static'));
app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');

const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
client.connect();

const coll = client.db(process.env.DB_NAME).collection("users");

app.post('/registreren', async (req, res) => {
  let city;
  // API Request
  try {
    const response = await fetch(`https://eu1.locationiq.com/v1/reverse?key=${apiKey}&lat=${req.body.latitude}&lon=${req.body.longitude}&format=json`);

    if (response.ok) {
      const jsonResponse = await response.json();
      city = await jsonResponse.address.city;
    }
  } catch (err) {
    console.log(err);
  }

  // database connectie
  try {
    coll.insertOne({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email,
      password: req.body.password
    });
  }
  catch (err) {
    console.log(err);
  }

  res.render('profiel', {
    naam: req.body.fname,
    city: city
  });
})

app.post('/complete', async (req, res) => {

  // database connectie
  try {
    const cursor = await coll.find({}, { "_id": 1 }).sort({ _id: -1 }).limit(1).toArray();
    const id = cursor[0]['_id'];
    coll.updateOne({ _id: id },
      { $set: { characteristics: req.body.eigenschappen, location: req.body.locatie } });
  } catch (err) {
    console.log(err);
  }
  res.render('bevestiging');
})

app.post('/inloggen', async (req, res) => {
  // database connectie
  try {
    const cursor = await coll.find({
      email: req.body.email,
      password: req.body.password
    }).toArray();
    if (cursor.length === 1) {
      return res.render('welkom', { naam: cursor[0].firstName });
    } else {
      return res.redirect('/inloggen.html');
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
