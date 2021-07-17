import { updateLocationById } from "../../../../services/mongooseHelpers";

export default async (req, res) => {
    if (req.method === "PUT") {
        const { id } = req.query;
        const updatedData = req.body;

        try {
            const response = await updateLocationById(id, updatedData);

            res.status(200).json({
                message: "Successfully location by id updated",
                location: response,
            });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
};
