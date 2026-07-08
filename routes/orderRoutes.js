const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");

router.post("/", createOrder);
router.get("/", adminAuth, getAllOrders);
router.put("/:id/status", adminAuth, updateOrderStatus);
router.get("/track", require("../controllers/orderController").trackOrder);

module.exports = router;
