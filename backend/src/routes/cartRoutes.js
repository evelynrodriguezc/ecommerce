const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/create", cartController.createCart);
router.get("/:user_id", cartController.obtainCart);
router.put("/update", cartController.updateCart);
router.delete("/empty/:user_id", cartController.deleteCart);

module.exports = router;

