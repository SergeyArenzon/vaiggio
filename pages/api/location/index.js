import Location from '../../../models/Location';
import connectDB from '../../../utils/connectDB';

const handler = async (req, res) => {
    await connectDB();


    // Create new Location
    if (req.method === 'POST') {
        const { name, price, location, description } = req.body;

        const locationModel = new Location({
            name,
            price,
            location,
            description,
        });

        try {
            const response = await locationModel.save();
            res.status(201).json({
                message: 'Successfully location added.',
                response,
            });
        } catch (error) {
            res.status(501).json({
                message: 'Failed adding location',
                error,
            });
        }
        await locationModel.save();
    }
};

export default handler;
