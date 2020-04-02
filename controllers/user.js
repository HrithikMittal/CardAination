var User = require("../Models/User");

var userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.state(400).json({ error: "User not found" });
    }
    req.profile = user; // adds profile object in req with user info
    next();
  });
};

module.exports = { userById };
