import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: String, // String is shorthand for {type: String}
    name: String,
    date: { type: Date, default: Date.now },
});

const User = mongoose.model('user ', userSchema);

export default User;
