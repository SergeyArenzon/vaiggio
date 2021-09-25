import { getSession } from "next-auth/client";
import {
  findOneUser,
  getLocationById,
  updateLocationById,
} from "../../../../services/mongooseHelpers";

export default async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "PUT") {
    const userEmail = session.user.email;
    const rating = req.body.rating;
    const locationId = req.query.id;

    try {
      const user = await findOneUser(userEmail);
      const location = await getLocationById(locationId);
      location.ratings.push({ user, rating });
      await updateLocationById(locationId, location);
      res.status(200).json({
        message: "Successfully rating was added",
        rating,
        location,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed adding rating",
        rating,
        location,
      });
    }
  }
};
