// db.js
require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }
  };
  
