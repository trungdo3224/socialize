import express from "express";
const router = express.Router();
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../controllers/postController.js";

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id/:user_id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePosts);

router.put("/:id/comment", createComment);
router.delete("/:id/:user_id/:comment_id", deleteComment);
export default router;
