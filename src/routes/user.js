const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const UserController = require("../app/controllers/UserController");

// router.use(function (req, res, next) {
//   req.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept, Authorization"
//   );
//   next();
// });

router.get("/all", UserController.allAccess);

router.get("/user", [authJwt.verifyToken], UserController.userBoard);

router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  UserController.moderatorBoard
);

router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.adminBoard
);

module.exports = router;
