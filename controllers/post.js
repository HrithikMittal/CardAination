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

module.exports = { getPosts, createPost, postsByUser };
