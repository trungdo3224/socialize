import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  //   console.log(req.body);
  // const { username, password, firstname, lastname } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPw;

  const newUser = new User(req.body);
  const { username } = req.body;
  try {
    const oldUser = await User.findOne({ username: username });

    if (oldUser) {
      return res.status(400).json({ message: "User already existed." });
    }

    const user = await newUser.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      `${process.env.JWT_SEC}`,
      { expiresIn: "24h" }
    );
    res.status(201).json({user, token});
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const validatedPassword = await bcrypt.compare(password, user.password);
      if (validatedPassword) {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SEC,
          { expiresIn: "24h" }
        );
        res.status(200).json({user, token});
      } else {
        res
          .status(400)
          .json("Invalid username or password, please check again.");
      }
    } else {
      res.status(404).json("User is not exists.");
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};
