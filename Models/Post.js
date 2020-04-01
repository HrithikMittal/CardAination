var mongoose = require("mongoose");
var PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
    minlength: 4,
    maxlength: 150
  },
  body: {
    type: String,
    required: "Body is required",
    minlength: 4,
    maxlength: 2000
  }
});

module.exports = Post = mongoose.model("Post", PostSchema);
