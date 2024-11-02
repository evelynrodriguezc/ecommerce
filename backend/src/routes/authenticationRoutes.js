const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    res.send("Login route working");
});

router.post("/register", (req, res) => {
    res.send("Register route working");
});

router.post("/logout", (req, res) => {
    res.send("Logout route working");
});

module.exports = router;