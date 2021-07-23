import Location from "../../../models/Location";
import connectDB from "../../../services/connectDB";
import { getSession } from "next-auth/client";
import { getAllLocations } from "../../../services/mongooseHelpers";
import { locationSchema } from "../../../validations/location";

const handler = async (req, res) => {
    const session = await getSession({ req });
    // console.log(session);
    await connectDB();

    // Create new Location
    if (req.method === "POST") {
        const { name, price, location, description, email } = req.body;

        // check for input validity
        const isValid = await locationSchema.isValid({
            name,
            price,
            location,
            description,
        });

        if (!isValid) {
            res.status(400).json({ message: "Error! Wrong input!" });
        }

        const locationModel = new Location({
            email,
            name,
            price,
            location,
            description,
            // comments: []
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
