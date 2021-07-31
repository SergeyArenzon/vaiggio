import { getSession } from "next-auth/client";
import {
    findOneUser,
    getLocationById,
    getCommentsByLocationId,
} from "../../../../../services/mongooseHelpers";
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

        // console.log(location);
        const comment = new Comment({
            author: author._id,
            title,
            body,
        });

        try {
            const response = await comment.save();
            commentId = response._id;

            location.comments.push(comment);
            location.save();

            //  const l = await Location.findOne({name: "test2"}).populate('comments').exec()
            //    console.log(l)

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
    } else if (req.method === "GET") {
        const { id } = req.query;

        try{
            const comments = await getCommentsByLocationId(id);
            res.status(200).json({
                message: "Successfully all comments fetched.",
                comments: comments,
            });
        
        }catch(error){
            res.status(501).json({
                message: "Failed adding comment",
                error,
            });
        }
    }
};
