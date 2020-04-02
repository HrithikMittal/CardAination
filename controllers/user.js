var bcrypt = require("bcryptjs");
var User = require("../Models/User");

const signup = (req, res) => {
  var newUser = new User(req.body);
  newUser
    .save()
    .then(user => {
      res.json({ user });
    })
    .catch(err => {
      res.josn({ Error: err, "Error message": err.message });
    });
};

module.exports = { signup };
