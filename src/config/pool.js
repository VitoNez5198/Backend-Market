const { Pool } = require('pg');

//const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    allowExitOnIdle: true
});

/*const pool = new Pool({
    connectionString,
});*/

module.exports = pool;
