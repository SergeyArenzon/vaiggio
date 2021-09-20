import {
  getLocationById,
  deleteLocationById,
} from "../../../../services/mongooseHelpers";
import { getSession } from "next-auth/client";

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
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const session = await getSession({ req });
    console.log(session.user.email);
    const location = await getLocationById(id);
    console.log(session.user.email, location.email);

    if (session.user.email !== location.email) {
      res.status(401).json({ message: "Wrong user trying to delete location" });
      return;
    }
    try {
      const respone = await deleteLocationById(id);
      res.status(200).json({
        message: "Successfully location Deleted by id",
        location: respone,
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
};
