var formidable = require("formidable");
var fs = require("fs");

var Post = require("../Models/Post");

const getPosts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then(posts => {
      res.status(200).json({ posts: posts });
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    let post = new Post(fields);
    req.profile.password = undefined;
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
    });
  });
};

const postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .then(posts => {
      res.json({ posts: posts });
    })
    .catch(err => {
      res.json({ message: err.message });
    });
};

const postById = (req, res, next, id) => {
  console.log(id);
  Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({ error: "Post not found" });
      }
      req.post = post; // adds profile object in req with user info
      next();
    });
};

const isPoster = (req, res, next) => {
  const authorized =
    req.post && req.auth && req.post.postedBy._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action"
    });
  }
  next();
};

var deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ post });
  });
};

module.exports = {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost
};
