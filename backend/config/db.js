const { Pool } = require('pg'); // [cite: 559]
require('dotenv').config(); // [cite: 560]

const pool = new Pool({
  user: process.env.DB_USER, // [cite: 562]
  host: process.env.DB_HOST, // [cite: 563]
  database: process.env.DB_DATABASE, // [cite: 564]
  password: process.env.DB_PASSWORD, // [cite: 565]
  port: process.env.DB_PORT, // [cite: 566]
});

module.exports = {
  query: (text, params) => pool.query(text, params), // [cite: 569]
};