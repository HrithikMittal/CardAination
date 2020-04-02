var express = require("express");
var router = express.Router();

var postValidation = require("../helpers/index");
var postControllers = require("../controllers/post");
var authControllers = require("../controllers/auth");
var userControllers = require("../controllers/user");

router.get("/", postControllers.getPosts);
router.post(
  "/post",
  authControllers.requireSign,
  postValidation.createPostValidator,
  postControllers.createPost
);

router.param("userId", userControllers.userById);
module.exports = router;
