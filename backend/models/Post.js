import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

const Post = model("Post", postSchema);

export default Post;
