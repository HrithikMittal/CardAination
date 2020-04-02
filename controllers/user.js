var bcrypt = require("bcryptjs");
var User = require("../Models/User");

const signup = (req, res) => {
  var newUser = new User(req.body);

  User.findOne({ email: newUser.email })
    .then(userres => {
      if (userres)
        res.json({
          message: "User is already signup with this email Id"
        });
      else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            if (err) res.josn({ message: "Error in hashing the password" });
            newUser
              .save()
              .then(user => {
                res.json({ user });
              })
              .catch(err => {
                res.json({ Error: err, "Error message": err.message });
              });
          });
        });
      }
    })
    .catch(err => {
      res.json({ message: "Error is in air" });
    });
};

const login = (req, res) => {
  var user = req.body;

  User.findOne({ email: user.email })
    .then(person => {
      bcrypt.compare(user.password, person.password, function(err, result) {
        if (!result) res.json({ message: "Wrong Password" });

        res.json({ message: "You are Authenticated" });
      });
    })
    .catch(err => {
      res.json({ message: err.message });
    });
};

module.exports = { signup, login };
