require("module-alias/register");
require("dotenv").config();

const knex = require("knex");
const config = require("./knexConfig");
const db = knex(config[process.env.NODE_ENV]);

db.raw("SELECT 1")
    .then(() => {
        console.log("[CONNECTED] Knex DB Connected");
    })
    .catch((err) => {
        console.error("[ERROR] Knex DB error", err.message);
    });

module.exports = db;
