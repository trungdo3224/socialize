import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// public images for client request
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"))

dotenv.config();

const PORT = `${process.env.PORT}`;
const DB_URI = "mongodb+srv://mernchatadmin:mernchatadmin@cluster0.xpgb9qe.mongodb.net/?retryWrites=true&w=majority"
mongoose
  .connect(`${DB_URI}`)
  .then(
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/upload", uploadRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
