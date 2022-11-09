import express from "express";

const router = express.Router();

import {
  deleteUser,
  followUser,
  getUserByID,
  getUsers,
  unFollowUser,
  updateUserProfile,
} from "../controllers/userController.js";

router.get("/", getUsers);

router.get("/:id", getUserByID);

router.put("/:id", updateUserProfile);

router.delete("/:id", deleteUser);

router.put("/:id/follow", followUser);

router.put("/:id/unfollow", unFollowUser);

export default router;
