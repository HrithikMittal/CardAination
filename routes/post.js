var express = require("express");
var router = express.Router();
var postControllers = require("../controllers/post");

router.get("/", postControllers.getPosts);
router.post("/post", postControllers.createPost);

module.exports = router;
