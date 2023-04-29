const express = require("express");
const router = express.Router();
const { authJwt } = require("../app/middleware");
const OrderController = require("../app/controllers/OrderController");

// Create order
router.post(
  "/create-order",
  [authJwt.verifyToken, authJwt.isAdmin],
  OrderController.createOrder
);

// Get list order
router.post(
  "/get-list-order",
  [authJwt.verifyToken, authJwt.isAdmin],
  OrderController.getListOrder
);

// Get detail order
router.get(
  "/get-detail-order/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  OrderController.getDetailOrder
);

// Delete detail order
router.delete(
  "/delete-detail-order/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  OrderController.deleteDetailOrder
);

// Update detail order
router.put(
  "/update-detail-order/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  OrderController.updateOrder
);

module.exports = router;
