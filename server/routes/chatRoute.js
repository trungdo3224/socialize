import express from "express";
import { createChat, findChat, userChats } from "../controllers/chatController.js";
const router = express.Router();

router.post("/", createChat); // create a chat room with two user
router.get("/:userId", userChats); // find a chat room with specific user
router.get("/find/:firstId/:secondId", findChat); // find chat room with two scecific user.

export default router;
