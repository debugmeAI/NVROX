require("dotenv").config({ path: __dirname + "/../.env" });

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection()
    .then(() => console.log("MySQL Connected"))
    .catch((err) => console.error("MySQL Connection Failed:", err));

module.exports = pool;
