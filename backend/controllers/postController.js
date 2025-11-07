import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import User from '../models/user.js';

// Create a new post
export const createPost = asyncHandler(async (req, res) => {
    const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error('Content is required');
  }

  const post = new Post({
    content: content,
    user: req.user._id,
  });

  const createdPost = await post.save();

  // Also add this post to the user's 'posts' array
  await User.findByIdAndUpdate(req.user._id, { $push: { posts: createdPost._id } });

  res.status(201).json(createdPost);
});
// Get all posts for the feed
export const getAllPosts = asyncHandler(async (req, res) => {
  // Find all posts and populate the 'user' field with their name
  const posts = await Post.find({})
    .populate('user', 'name')
    .sort({ createdAt: -1 }); // Show newest first
    
  res.json(posts);
});
