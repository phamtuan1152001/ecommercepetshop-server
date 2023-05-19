const express = require("express");
const router = express.Router();
const { authJwt } = require("../app/middleware");
const NewsController = require("../app/controllers/NewsController");

// Create order
router.post("/create-news", [authJwt.verifyToken], NewsController.createNews);

// Get list order
router.post(
  "/get-list-order",
  [authJwt.verifyToken],
  NewsController.getListNews
);

// Get detail order
router.get(
  "/get-detail-order/:id",
  [authJwt.verifyToken],
  NewsController.getDetailNews
);

// Delete detail order
router.delete(
  "/delete-detail-order/:id",
  [authJwt.verifyToken],
  NewsController.deleteDetailNews
);

// Update detail order
router.put(
  "/update-detail-order/:id",
  [authJwt.verifyToken],
  NewsController.updateDetailNews
);

module.exports = router;
