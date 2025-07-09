require("dotenv").config({ path: __dirname + "/../.env" });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: __dirname + "/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: __dirname + "/seeds",
        },
    },
};
