const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/:userId/create", orderController.createOrderfromCart);
router.get("/:userId/order/:orderId", orderController.obtainOrder);

module.exports = router;