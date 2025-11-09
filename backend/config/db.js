const { Pool } = require('pg'); // [cite: 559]
require('dotenv').config(); // [cite: 560]

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params), // [cite: 569]

};
