const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const VoucherController = require("../app/controllers/VoucherController");

// Create vouchers
router.post(
  "/create",
  [authJwt.verifyToken, authJwt.isAdmin],
  VoucherController.createVoucher
);

// Get list vouchers
router.post(
  "/listClient",
  [authJwt.verifyToken, authJwt.isAdmin],
  VoucherController.getListVoucher
);

// Update voucher
router.put(
  "/update/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  VoucherController.updateVoucher
);

// Delete voucher
router.delete(
  "/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  VoucherController.deleteVoucher
);

// Get detail
router.get(
  "/detail/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  VoucherController.getDetailVoucher
);

module.exports = router;
