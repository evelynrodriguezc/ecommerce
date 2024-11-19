const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareAuthentication = require("../middleware/middlewareAuthentication");

// CRUD routes
router.post("/registerUser", userController.registerUser);
router.post("/loginUser", userController.loginUser);
router.get("/profile", middlewareAuthentication, userController.obtainUserProfile);
router.put("/profile", middlewareAuthentication, userController.updateUserProfile);

module.exports = router;