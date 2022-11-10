import mongoose from "mongoose";

import Post from "../models/Post.js";
import User from "../models/User.js";

// Creat new Post
export const createPost = async (req, res) => {
  console.log(req.body)
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.user_id;
  try {
    const post = await Post.findById(id);

    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline POsts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);

  try {
    const currentUserPosts = await Post.find({ userId: userId });
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createComment = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    await post.comments.unshift(req.body);
    // await post.updateOne({ $push: { comments: req.body } })
    await post.save();
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteComment = async (req, res) => {
  const postId = req.params.id;
  const userId = req.params.user_id;
  const commentId = req.params.comment_id;
  try {
    const post = await Post.findById(postId);
    const commentIndex = post.comments.findIndex((comment) => (comment._id).toString() === commentId);
    const comment = post.comments[commentIndex];
    if (comment.userId === userId) {
      // console.log(comment)
      post.comments.splice(commentIndex, 1);
      await post.save();
      // await post.updateOne({ $pull: { comments: comment } })
      res.status(200).json("Comment deleted successfully!");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
