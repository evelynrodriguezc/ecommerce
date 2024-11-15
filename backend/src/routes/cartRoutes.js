const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/create", cartController.createCart);
router.get("/:userId", cartController.obtainCart);
router.put("/update", cartController.updateCart);
router.delete("/empty/:userId", cartController.deleteCart);

module.exports = router;

