const postModel = require("../models/post");
const multer = require("multer");

module.exports = {
  addPost: async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const posts = await new postModel({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId,
    });
    posts
      .save()
      .then((createdPost) => {
        res.status(201).json({
          message: "post added successfully",
          post: {
            ...createdPost,
            id: createdPost._id,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Creating a post failed!",
        });
      });
  },
  updatePostById: async (req, res, next) => {
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
      creator: req.userData.userId,
    });
    await postModel
      .updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
      .then((result) => {
        if (result.n > 0) {
          res.status(200).json({
            message: "Update Successfull!",
          });
        } else {
          res.status(401).json({
            message: "Update Failed!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Couldn't update post",
        });
      });
  },
  getAllPosts: async (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let postQuery = postModel.find();
    let fethcedPost;
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    await postQuery
      .then((data) => {
        fethcedPost = data;
        return postModel.countDocuments();
      })
      .then((count) => {
        res.status(200).json({
          message: "posts Fetched Succesfully",
          posts: fethcedPost,
          maxPosts: count,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Fetching posts failed!",
        });
      });
  },
  getPostById: async (req, res, next) => {
    postModel
      .findById(req.params.id)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "Post not found!" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Fetching post failed!",
        });
      });
  },
  deletePostById: async (req, res, next) => {
    postModel
      .deleteOne({ _id: req.params.id, creator: req.userData.userId })
      .then((result) => {
        if (result.n > 0) {
          res.status(200).json({
            message: "Post deleted!",
          });
        } else {
          res.status(401).json({
            message: "Post deleted failed!",
          });
        }
      });
  },
};
