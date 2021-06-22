import Location from "../../../models/Location";
import connectDB from "../../../utils/connectDB";
import { getSession } from 'next-auth/client'
import { getAllLocations } from "../../../utils/mongooseHelpers";


const handler = async (req, res) => {
    const session = await getSession({ req })
    // console.log(session);
    await connectDB();

    // Create new Location
    if (req.method === "POST") {

        const { name, price, location, description } = req.body;

        const locationModel = new Location({
            email: session.user.email,
            name,
            price,
            location,
            description,
        });

        try {
            const response = await locationModel.save();
            res.status(201).json({
                message: "Successfully location added.",
                response,
            });
        } catch (error) {
            res.status(501).json({
                message: "Failed adding location",
                error,
            });
        }
        await locationModel.save();
    }
    if (req.method === "GET") {
        try {
            const locations = await getAllLocations();
            res.status(200).json({ locations: locations });
        } catch (error) {
            res.status(500).json({
                message: "Error in fetchin locations",
                error,
            });
        }
    }
};

export default handler;
