import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const validateDoc = await Chat.find({
      members: {
        $exists: true,
        $nin: [req.body.senderId, req.body.recieverId],
      },
    });
    if (validateDoc.length === 0) {
      const result = await newChat.save();
      res.status(201).json(result);
    } else {
      res.status(400).json({ errMessage: "Connection is already established." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
