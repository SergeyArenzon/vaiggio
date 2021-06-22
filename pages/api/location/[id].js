import { getLocationById } from "../../../utils/mongooseHelpers";

export default async (req, res) => {
    if (req.method === "GET") {
        const { id } = req.query;

        try {
            const location = await getLocationById(id);
            res.status(200).json({
                message: "Successfully location by id fatched",
                location: location,
            });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
};
