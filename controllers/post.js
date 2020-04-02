var formidable = require("formidable");
var fs = require("fs");

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

const createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not beupoaded"
      });
    }
    let post = new Post({ fields });
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
