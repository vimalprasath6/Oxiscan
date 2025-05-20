// db.js

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',        // or the IP of your database server
  port: 5432,               // default PostgreSQL port
  user: 'postgres',         // your PostgreSQL username
  password: '1199',// your PostgreSQL password
  database: 'reportdata'    // your database name
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL Database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
