const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Create a new post
router.post("/posts", async (req, res) => {
  console.log("Incoming request body:", req.body); // Check the incoming data

  const { title, content, author } = req.body;

  // Check if the required fields are missing
  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Title, content, and author are required!" });
  }

  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single post
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a post
router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
