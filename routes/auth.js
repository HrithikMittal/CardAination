var express = require("express");
var router = express.Router();

var authController = require("../controllers/auth");
var userValidator = require("../helpers/index");

router.post(
  "/signup",
  userValidator.userSignupValidator,
  authController.signup
);
router.post("/signin", userValidator.userSigninValidator, authController.login);
router.get("/signout", authController.signout);

module.exports = router;
