'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT ||3000;
const saltRounds = 10;


const connString = process.env.DATABASE;
const client = new pg.Client(connString);

client.connect();
client.on('error', (err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/admin', (req, res) => {
  res.sendFile('admin.html');
});

app.get('/*', (req, res) =>
res.sendFile('index.html', {root: './public'}));


app.listen(PORT, () => console.log('Active'));
