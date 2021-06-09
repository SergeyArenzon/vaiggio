import User from '../models/User';
import { compare } from 'bcrypt';
import connectDB from './connectDB';

//  check for user existance
export const checkUserExist = async (email) => {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
        return true;
    }
    return false;
};

export const findOneUser = async (email) => {
    await connectDB();
    const user = await User.findOne({ email: email }).exec();
    return user;
};

export const verifyPassword = async (password, hashedPassword) => {
    const isValid = await compare(password, hashedPassword);
    return isValid;
};
