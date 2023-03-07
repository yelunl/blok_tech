const express = require('express');
const ejs = require('ejs');

const app = express();
const port = 5500;

app.use(express.static('./static'));
app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/inloggen', (req, res) => {
  res.send('dit is een inlogpagina');
})

app.post('/registreren', (req, res) => {
  console.log(req.body.fname);
  res.render('profiel', { naam: req.body.fname });
})

app.get('/account-pagina/:user', (req, res) => {
  res.send(`dit is een accountpagina ${req.params.user}`);
})

app.get('/error', (req, res) => {
  res.send('<h1>Error 404</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})