import User from '../models/User';

export const checkUserExist = async (email) => {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
        return true;
    }

    return false;
};
