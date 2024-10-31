const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectBD = require("./src/config/dataBase");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectBD();

//rutas
app.use("/api/authentication", require("./src/routes/routesAuthentication"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/products", require("./src/routes/"));
app.use("/api/products", require("./src/routes/"));
app.use("/api/products", require("./src/routes/"));

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}`)
});