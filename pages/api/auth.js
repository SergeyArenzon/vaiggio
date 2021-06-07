// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import User from '../../models/User';
import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import { checkUserExist } from '../../utils/mongooseHelpers';

export default async (req, res) => {
    connectDB();

    if (req.method === 'POST') {
        const { email, password } = req.body;

        console.log(email);
        // check for user existence
        const userExist = await checkUserExist(email);
        // console.log(userExist);

        // if user exist stop and return
        if (userExist) {
            res.status(409).json({ message: 'User exist!' });
            return;
        }

        // user isnt exist
        const user = new User({ email, password });

        //  create new user in db
        try {
            const response = await user.save();
            res.status(201).json({
                message: 'Successfully user added.',
                response,
            });
        } catch (error) {
            res.status(501).json({
                message: 'Failed adding user',
                error,
            });
        }
        await user.save();
    }
};
