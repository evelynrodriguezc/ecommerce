const { Pool } = require("pg");

const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "ecommerce",
    password: "admin",
    port: 5432,
});

pool.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch((err) => console.error("Error connecting to PostgreSQL:", err.message));


module.exports = pool;