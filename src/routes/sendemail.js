const express = require("express");
const router = express.Router();

const SendEmailController = require("../app/controllers/SendEmailController");

router.post("/vouchers", SendEmailController.sendEmail);

module.exports = router;
