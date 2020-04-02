var _ = require("lodash");
var User = require("../Models/User");

var userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user; // adds profile object in req with user info
    next();
  });
};

var hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

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

var getUser = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

var updateUser = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body); // extend - mutate the source object
  user.updated = Date.now();
  user
    .save()
    .then(userres => {
      userres.password = undefined;
      res.json({ User: userres });
    })
    .catch(err => {
      res.json({ message: "Update User successfully" });
    });
};

var deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    user.password = undefined;
    res.json({ user });
  });
};

module.exports = {
  userById,
  hasAuthorization,
  allUsers,
  getUser,
  updateUser,
  deleteUser
};
