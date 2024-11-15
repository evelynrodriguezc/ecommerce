// In ./src/routes/authenticationRoutes.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/dataBase");
const pool = require("./src/config/dataBasePostgres");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// routes
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/cart", require("./src/routes/cartRoutes"));

console.log("Registered routes:", app._router.stack.map(r => r.route?.path).filter(Boolean));

// middleware errors management
app.get("/", (req, res) => {
    res.send("Server is working");
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({message: "Internal server error", error: error.message});
});

const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`\nMongoDB Server running at: ${PORT}`);
});

const PORTPG = 5432;
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
    console.error("Error connecting to the PG database:", err);
    } else {
    console.log(`\nPGDB Server running at: ${PORTPG}`);
    console.log("PGDB connected");
    }
    pool.end();
});


// Handle shutdown gracefully
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});