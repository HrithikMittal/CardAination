var express = require("express");
var router = express.Router();

var postValidation = require("../helpers/index");
var postControllers = require("../controllers/post");
var authControllers = require("../controllers/auth");
var userControllers = require("../controllers/user");

router.get("/", postControllers.getPosts);
router.post(
  "/new/:userId",
  authControllers.requireSign,
  postControllers.createPost,
  postValidation.createPostValidator
);
router.get("/:userId", postControllers.postsByUser);
router.delete(
  "/:postId",
  authControllers.requireSign,
  postControllers.isPoster,
  postControllers.deletePost
);
router.put("/:postId", authControllers.requireSign, postControllers.updatePost);

router.param("userId", userControllers.userById);
router.param("postId", postControllers.postById);
module.exports = router;
