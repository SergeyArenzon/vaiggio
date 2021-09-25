import { updateLocationById, getLocationById } from "../../../../services/db";
import { getSession } from "next-auth/client";


export default async (req, res) => {
    const session = await getSession({ req });
    

    if (req.method === "PUT") {
        const { id } = req.query;
        const updatedData = req.body;

        // Check for correct user trying to edit 
        const location = await getLocationById(id);
        if(location.email !== session.user.email){
            res.status(401).json({message: "Wrong user editing location"});
            return;
        }
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
