import mongoose from "mongoose";
// import User from "./User";

const { Schema } = mongoose;

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
});

const Comment =
    mongoose.models["comment"] || mongoose.model("comment", commentSchema);

export default Comment;
