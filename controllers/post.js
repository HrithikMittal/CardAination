var Post = require("../Models/Post");

const getPosts = (req, res) => {
  Post.find()
    .select("_id title body")
    .then(posts => {
      res.status(200).json({ posts: posts });
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const createPost = (req, res) => {
  var newPost = new Post(req.body);
  newPost
    .save()
    .then(post => {
      res.status(200).json({ message: post });
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

module.exports = { getPosts, createPost };
