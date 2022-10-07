const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      return res.json({
        error: err,
      });
    }
    //New user object. New user properties contain name, email and password
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    user
      .save()
      .then((user) => {
        return res.json({
          message: "New user account created successfully!",
        });
      })
      .catch((error) => {
        return res.json({
          message: "Error creating account",
        });
      });
  });
};

const login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  //Search for user in database
  User.find({ $or: [{ email: username }] }).then((user) => {
    //Condition to check if the user exists
    if (user) {
      //Comparison of submitted password with encrypted password
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.json({
            error: err,
          });
        }
        if (result) {
          //Password assign token after successful login. Token is valid for an hour
          let token = jwt.sign({ name: user.name }, "secretValue", {
            expiresIn: "1h",
          });
          return res.json({
            message: "Login successful!",
            token,
          });
        } else {
          //Error message returned if passwords don't match
          return res.json({
            message: "Incorrect password",
          });
        }
      });
    } else {
      return res.json({
        //Error message returned if user if not found in database
        message: "Invalid login",
      });
    }
  });
};

module.exports = { register, login };
