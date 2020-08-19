const express = require("express");
const router = express.Router();
const multer = require("multer");
const postModel = require("../models/post");
const { createPostfix } = require("typescript");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (error) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "/addPosts",
  multer({ storage: storage }).single("image"),
  async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const posts = await new postModel({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
    });
    posts.save().then((createdPost) => {
      res.status(201).json({
        message: "post added successfully",
        postId: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    });
  }
);

router.put(
  "/updatePost/:id",
  multer({ storage: storage }).single("image"),
  async (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = await new postModel({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
    });
    await postModel
      .updateOne({ _id: req.params.id }, post)
      .then((result) => {
        res.status(200).json({
          message: "Update Successfull!",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.get("/getPosts", async (req, res, next) => {
  await postModel.find().then((data) => {
    res.status(200).json({
      message: "posts Fetch Succesfully",
      posts: data,
    });
  });
});

router.get("/getPost/:id", async (req, res, next) => {
  postModel.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/deletePost/:id", async (req, res, next) => {
  postModel.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
