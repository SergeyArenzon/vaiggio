// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import User from '../../models/User';
import connectDB from '../../utils/connectDB';
import User from '../../models/User';

export default async (req, res) => {
    await connectDB();

    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user = new User({ email, password });

        try {
            const response = await user.save();
            res.status(201).json({
                message: 'Successfully user added.',
                response,
            });
        } catch (error) {
          res.status(501).json({
            message: 'Failed adding user',
        });
        }
        await user.save();
    }
};
