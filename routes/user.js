var express = require("express");
var router = express.Router();

var userController = require("../controllers/user");

router.post("/sign", userController.signup);

module.exports = router;
