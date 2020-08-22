const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const privateKey = "privateKey";

router.post("/user/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new userModel({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({ message: "User created", result });
      })
      .catch((error) => {
        res.status(500).json({
          message: "User already exist",
          error,
        });
      });
  });
});

router.post("/user/signin", async (req, res, next) => {
  let fetchUser;
  await userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "There is no user exist",
        });
      }
      fetchUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "wrong password",
        });
      }
      const token = jwt.sign(
        { email: fetchUser.email, userId: fetchUser._id },
        privateKey,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json({
        message: "email or password invalid",
      });
    });
});

module.exports = router;
