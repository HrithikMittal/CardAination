var express = require("express");
var router = express.Router();

var postValidation = require("../helpers/index");
var postControllers = require("../controllers/post");
var authControllers = require("../controllers/auth");

router.get("/", authControllers.requireSign, postControllers.getPosts);
router.post(
  "/post",
  postValidation.createPostValidator,
  postControllers.createPost
);

module.exports = router;
