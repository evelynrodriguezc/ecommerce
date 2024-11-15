const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareAutenthication = require("../middleware/middlewareAuthentication");

// CRUD routes
router.post("/", userController.registerUser);
router.post("/", userController.loginUser);
router.get("/profile", middlewareAutenthication, userController.obtainUserProfile)

module.exports = router;