var express = require("express");
var router = express.Router();

var userValidator = require("../helpers/index");
var authController = require("../controllers/auth");
var userController = require("../controllers/user");

router.post(
  "/signup",
  userValidator.userSignupValidator,
  authController.signup
);
router.post("/signin", userValidator.userSigninValidator, authController.login);
router.get("/signout", authController.signout);

router.param("userId", userController.userById);
module.exports = router;
