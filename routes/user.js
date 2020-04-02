var express = require("express");
var router = express.Router();

var authController = require("../controllers/auth");
var userController = require("../controllers/user");

router.get("/users", userController.allUsers);
router.get("/user/:userId", userController.getUser);

router.param("userId", userController.userById);
module.exports = router;
