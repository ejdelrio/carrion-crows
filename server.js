'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pg = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const priv_app = express();
const PORT = process.env.PORT ||3000;
const saltRounds = 10;


const connString = 'postgres://localhost:5432/crows';
const client = new pg.Client(connString);

client.connect();
client.on('error', (err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/admin/*', (req, res) => {
  res.sendFile('admin.html', {root: './private'});
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', {root: './public'});
});

app.get('/validate', (req, res) => {

  client.query('SELECT * FROM admin')
  .then(result => {
    res.send(!result.rows.length === 0);
  })
  .catch(err => console.log(err));
});

app.get('/password', (req, res)=> {client.query('SELECT hash FROM tablename WHERE username=$1',
  [req.body.username])
  .then(result => {
    bcrypt.compare(req.password, result.row[0].hash, (err, valid) => {
      res.send(valid ? result.row[0] : false);
    });
  });
});

app.get('/members', (req, res) => {
  client.query('SELECT * FROM members').then(result => {
    res.send(result.rows);
  });
});

app.post('/add-member', function(request, response) {
  client.query(
    'INSERT INTO members(first_name, last_name, instrument, bio, img_path) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
    [request.body.first, request.body.last, request.body.instrument, request.body.bio, request.body.imgPath],
    function(err) {
      if (err) console.error(err);
      response.send('member added!');
    }
  );
});

app.delete('/member/:id', (request, response) => {
  client.query(
    `DELETE FROM members WHERE member_id=$1;`,
    [request.params.id]
  )
  .then(() => response.send('Delete complete'))
  .catch(console.error);
});

app.get('/*', (req, res) =>
res.sendFile('index.html', {root: './public'}));




app.listen(PORT, () => console.log('Active'));

//---------Database Loaders -----------

function createAdminTable() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    admin (
      user_id SERIAL PRIMARY KEY,
      user_name VARCHAR(255) UNIQUE NOT NULL,
      hash VARCHAR(255) NOT NULL
    );`
  )
  .catch(console.error);
}

function createBandMembers() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    members (
      member_id SERIAL PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      instrument VARCHAR(255),
      bio VARCHAR(255),
      img_path VARCHAR(255)
    );`
  )
  .catch(console.error);
}

function createShows() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    shows (
      show_id SERIAL PRIMARY KEY,
      date INTEGER,
      location VARCHAR(255),
      time INTEGER,
      cover INTEGER,
      description VARCHAR(255)
    );`
  )
  .catch(console.error);
}

createBandMembers();
createAdminTable();
createShows();
