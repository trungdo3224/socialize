import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  comment: { type: String, required: true },
  postId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    image: String,
    video: String,
    likes: [],
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

var Post = mongoose.model("Posts", PostSchema);
export default Post;
