const { Pool } = require("pg");

const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "ecommerce",
    password: "admin",
    port: 5432,
});

const connectDBPostgres = async () => {
    try {
        await pool.connect();
        console.log("PGSQL connected");
    } catch (error) {
        console.error("Error connecting to the PGSQL database:", error.message);
    }
};

module.exports = { connectDBPostgres, pool};