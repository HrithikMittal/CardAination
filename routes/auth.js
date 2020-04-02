var express = require("express");
var router = express.Router();

var userController = require("../controllers/auth");
var userValidator = require("../helpers/index");

router.post(
  "/signup",
  userValidator.userSignupValidator,
  userController.signup
);
router.post("/login", userValidator.userSigninValidator, userController.login);

module.exports = router;
