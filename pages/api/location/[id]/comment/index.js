import { getSession } from "next-auth/client";
import { findOneUser, getLocationById,  } from "../../../../../services/mongooseHelpers";
import Comment from "../../../../../models/Comment";
import Location from "../../../../../models/Location";
export default async (req, res) => {
    const session = await getSession({ req });
    //
    //  Create new comment on location
    //
    if (req.method === "POST") {
        const { id } = req.query;
        const { title, body } = req.body;
        const locationId = id;
        const creatorEmail = session.user.email;
        const author = await findOneUser(creatorEmail);
        const location = await getLocationById(locationId);
        let commentId = null;
        const comment = new Comment({
            author: author._id,
            title,
            body,
        });

        try {
            const response = await comment.save();
            commentId = response._id;

            res.status(201).json({
                message: "Successfully comment added.",
                response,
            });
        } catch (error) {
            console.log(error);
            res.status(501).json({
                message: "Failed adding comment",
                error,
            });
        }
    }
};
