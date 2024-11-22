const { Pool } = require("pg");

const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "ecommerce",
    password: "admin",
    port: 5432,
});

const connectBDPG = async () => {
    try {
        await pool.connect();
        console.log("Conexión exitosa a PostgreSQL");
    } catch (error) {
        console.error("Error al conectar a PostgreSQL:", error.message);
    }
};

module.exports = { connectBDPG, pool };
