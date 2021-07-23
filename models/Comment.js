
import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
    email: String, 
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
});

const Comment = mongoose.models['comment'] || mongoose.model('comment', commentSchema);

export default Comment;
