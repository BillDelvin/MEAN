const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const postsController = require("../controllers/posts");
const checkImage = require("../middleware/check-image");

router.post("/addPosts", checkAuth, checkImage, postsController.addPost);

router.put(
  "/updatePost/:id",
  checkAuth,
  checkImage,
  postsController.updatePostById
);

router.get("/getPosts", postsController.getAllPosts);

router.get("/getPost/:id", postsController.getPostById);

router.delete("/deletePost/:id", checkAuth, postsController.deletePostById);

module.exports = router;
