const express = require("express");

const {
  fetchAllOrders,
  fetchSingleOrder,
  orderPayment,
  allPayments,
} = require("../../controllers/admin/admin-order-controller");

const router = express.Router();
router.get("/fetch-all-orders", fetchAllOrders);
router.get("/fetch-single-order/:id", fetchSingleOrder);
router.get("/order-payment/:order_id", orderPayment);
router.get("/all-payments", allPayments);

module.exports = router;
