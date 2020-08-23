const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/user/signup", userController.createUser);
router.post("/user/signin", userController.signInUser);

module.exports = router;
