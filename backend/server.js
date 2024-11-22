
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/dataBase");
const { connectBDPG } = require("./src/config/dataBasePostgres");
const middlewareAuthentication = require("./src/middleware/middlewareAuthentication");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

connectBDPG();

// routes
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/cart", require("./src/routes/cartRoutes"));

app.get("/api/user/profile", middlewareAuthentication, (req, res) => {
    res.status(200).json({ message: "Profile retrieved", user: req.user });
});

app.get("/", (req, res) => {
    res.send("Server is working");
});

// errors management
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({message: "Internal server error", error: error.message});
});


app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
});