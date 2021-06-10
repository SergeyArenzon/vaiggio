// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from '../../../utils/connectDB';
import User from '../../../models/User';
import { checkUserExist } from '../../../utils/mongooseHelpers';
import { userSchema } from '../../../validations/user';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    connectDB();

    if (req.method === 'POST') {
        const { email, password, lastName, firstName } = req.body;

        // check for user existence
        const userExist = await checkUserExist(email);
        // console.log(userExist);

        // if user exist stop and return
        if (userExist) {
            res.status(409).json({ message: 'User exist!' });
            return;
        }

        // user isnt exist

        // check for input validity
        const isValid = await userSchema.isValid({ email, password });

        if (!isValid) {
            res.status(400).json({ message: 'User input is not valid!' });
            return;
        }

        // hashing password
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // compeare functions

        // bcrypt.compare(password, hashedPassword).then(function(result) {
        //     console.log(result)

        // });

        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

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
