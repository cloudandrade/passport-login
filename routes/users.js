const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const router = express.Router();

//models
require("../models/User");
const User = mongoose.model("users");

//Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

//Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

//register handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //check if passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //validation passed
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          //user exists
          errors.push({ msg: "Email es already registered" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          //hash password
          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(userCreated => {
                  req.flash(
                    "success_msg",
                    "you are now registered and can login"
                  );
                  res.redirect("/users/login");
                })
                .catch(err => {
                  console.log(err);
                });
            });
          });

          // console.log(newUser);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
});

module.exports = router;
