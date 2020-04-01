var express = require("express");
var router = express.Router();
var postControllers = require("../controllers/post");
var postValidation = require("../helpers/index");

router.get("/", postControllers.getPosts);
router.post(
  "/post",
  postValidation.createPostValidator,
  postControllers.createPost
);

module.exports = router;
