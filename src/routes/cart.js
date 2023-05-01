const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const CartController = require("../app/controllers/CartController");

// Create list item in cart
router.post(
  "/create-cart",
  // [authJwt.verifyToken, authJwt.isAdmin],
  CartController.createCart
);

// Get item in cart
router.post(
  "/get-cart",
  // [authJwt.verifyToken, authJwt.isAdmin],
  CartController.getCart
);

// Delete item in cart
router.post(
  "/delete-item",
  // [authJwt.verifyToken, authJwt.isAdmin],
  CartController.deleteItemCart
);

module.exports = router;
