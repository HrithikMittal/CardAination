var express = require("express");
var router = express.Router();
var postControllers = require("../controllers/post");

router.get("/", postControllers.getPosts);

module.exports = router;
