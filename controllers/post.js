var Post = require("../Models/Post");

const getPosts = (req, res) => {
  res.json({ message: "Welcome to Commuincation" });
};

const createPost = (req, res) => {
  var newPost = new Post(req.body);
  newPost
    .save()
    .then(post => {
      res.json({ message: post });
    })
    .catch(err => {
      console.log("Error is:", err.message);
    });
};

module.exports = { getPosts, createPost };
