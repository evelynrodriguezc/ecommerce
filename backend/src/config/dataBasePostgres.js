const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "users_db",
    password: "admin",
    port: 5432
})

module.exports = pool;