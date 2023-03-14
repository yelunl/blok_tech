const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const apiKey = process.env.API_KEY;
// console.log(process.env);

const app = express();
const port = 5500;

app.use(express.static('./static'));
app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const coll = client.db(process.env.DB_NAME).collection("users");

// async function run() {
//   try {
//     await client.connect();
//     // database and collection code goes here
//     const db = client.db("matchingApp");
//     // ('process.env.DB_NAME')
//     const coll = db.collection("users");
//     // find code goes here
//     const cursor = await coll.find({
//       firstName: '',
//       lastName: ''
//     }, { firstName: 1 });
//     // iterate code goes here
//     await cursor.forEach(console.log);
//     // const id = cursor[0]['_id'];
//     // const bla = await coll.find({ '_id': id });
//     // await bla.forEach(console.log);
//   }
//   finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

app.post('/registreren', async (req, res) => {
  let city;

  // API Request
  try {
    const response = await fetch(`https://eu1.locationiq.com/v1/reverse?key=${apiKey}&lat=${req.body.latitude}&lon=${req.body.longitude}&format=json`);

    if (response.ok) {
      jsonResponse = await response.json();
      console.log(jsonResponse.address.city);
      city = await jsonResponse.address.city;
      console.log(city);
      console.log('inside response ok');
    }
    // throw new Error('request failed');
  } catch (err) {
    console.log(err);
    console.log('inside catch api call');
  }


  // console.log('outside api call');
  // await getLocation();
  console.log(city + ' outside');



  // database connectie
  // async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    // const db = client.db("matchingApp");
    // // ('process.env.DB_NAME')
    // const coll = db.collection("users");
    // find code goes here
    const insert = coll.insertOne({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email,
      password: req.body.password
    });
    const cursor = coll.find({
      firstName: req.body.fname,
      lastName: req.body.lname
    });
    // iterate code goes here
    // await cursor.forEach(console.log);
  }
  catch (err) {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.log(err);
  }

  // run().catch(console.dir);

  res.render('profiel', {
    naam: req.body.fname,
    city: city
  });
  console.log(city + ' inside database');
})

app.post('/complete', async (req, res) => {

  // database connectie
  try {
    await client.connect();
    // database and collection code goes here
    // const db = client.db("matchingApp");
    // // ('process.env.DB_NAME')
    // const coll = db.collection("users");
    // find code goes here
    const cursor = await coll.find({}, { "_id": 1 }).sort({ _id: -1 }).limit(1).toArray();
    // iterate code goes here
    // await cursor.forEach(console.log);
    const id = cursor[0]['_id'];
    const bla = await coll.find({ '_id': id });
    await bla.forEach(console.log);
    coll.updateOne({ _id: id },
      { $set: { characteristics: req.body.eigenschappen, location: req.body.locatie } });
  } catch (err) {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.log(err);
  }

  // run().catch(console.dir);
  res.render('bevestiging');
})



app.post('/inloggen', async (req, res) => {
  // async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    // const db = client.db("matchingApp");
    // ('process.env.DB_NAME')
    // const coll = db.collection("users");
    // find code goes here
    const cursor = await coll.find({
      email: req.body.email,
      password: req.body.password
    }).toArray();
    if (cursor.length === 1) {
      console.log(req.body.email);
      return res.render('welkom', { naam: cursor[0].firstName });
    } else {
      console.log('else statment');
      return res.status(204).send();
      // res.redirect('/');
    }
    // iterate code goes here
    // await cursor.forEach(console.log);
    // await bla.forEach(console.log);

  } catch (err) {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.log(err);
  }

  // run().catch(console.dir);
});

app.get('/account-pagina/:user', (req, res) => {
  res.send(`dit is een accountpagina ${req.params.user}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
