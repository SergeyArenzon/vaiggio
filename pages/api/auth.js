// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import User from '../../models/User';
import connectDB from '../../utils/connectDB';
import mongoose from 'mongoose';
import User from '../../models/User';

export default async (req, res) => {
    await connectDB();
    

    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user = new User({email, password});
        await user.save();
    }

    res.status(200).json(req.body);
};
