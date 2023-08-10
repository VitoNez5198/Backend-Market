const { Pool } = require('pg');

const connectionString = "postgresql://postgres:ClcjRgsSTeEw1QXNigK1@containers-us-west-208.railway.app:5538/railway";

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     allowExitOnIdle: true
// });

const pool = new Pool({
    connectionString,
});

module.exports = pool;
