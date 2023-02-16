const express = require('express');

const app = express();
const port = 5500;

app.use(express.static('./static'));

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1><img src="./images/cloud_cake.jpeg" width="600px">');
})

app.get('/inloggen', (req, res) => {
  res.send('dit is een inlogpagina');
})

app.get('/registreren', (req, res) => {
  res.send('dit is een registratiepagina');
})

app.get('/account-pagina/:user', (req, res) => {
  res.send(`dit is een accountpagina ${req.params.user}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})