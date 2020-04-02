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

var hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action"
    });
  }
  next();
};

var allUsers = (req, res) => {
  User.find()
    .select("name email updated created")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json({ message: "Error is in getting all users" });
    });
};

module.exports = { userById, hasAuthorization, allUsers };
