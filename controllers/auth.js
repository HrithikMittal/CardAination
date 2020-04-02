var bcrypt = require("bcryptjs");
var User = require("../Models/User");
var jwt = require("jsonwebtoken");

const signup = (req, res) => {
  var newUser = new User(req.body);

  User.findOne({ email: newUser.email })
    .then(userres => {
      if (userres)
        res.status(403).json({
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
                user.password = undefined;

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
      if (!person) return res.json({ message: "User not found" });
      else {
        bcrypt.compare(user.password, person.password, function(err, result) {
          if (!result) res.json({ message: "Wrong Password" });

          // generate a token with user id and secret
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

          // persist the token as 't' in cookie with expiry date
          res.cookie("t", token, { expire: new Date() + 9999 });

          // return response with user and token to frontend client
          const { _id, name, email } = person;
          return res.json({ token, user: { _id, email, name } });
        });
      }
    })
    .catch(err => {
      res.json({ message: err.message });
    });
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signout succes!" });
};

module.exports = { signup, login, signout };
