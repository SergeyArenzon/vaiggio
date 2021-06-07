import User from '../models/User';



//  check for user existance
export const checkUserExist = async (email) => {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
        return true;
    }

    return false;
};


export const createUser = async() => {
    
}