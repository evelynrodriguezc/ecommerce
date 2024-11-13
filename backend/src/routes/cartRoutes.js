const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.createCart);
router.get("/:userId", cartController.obtainCart);
router.get("/:userId/:id", cartController.obtainCartbyId);
router.put("/:userId/:id", cartController.updateCart);
router.delete("/:userId/:id", cartController.deleteCart);

module.exports = router;

