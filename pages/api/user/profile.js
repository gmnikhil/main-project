import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import User from "../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { user } = await verifyToken(req);
        if (!user) throw new Error("User Token verification Error");
        res.status(200).json({ success: true, user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        //console.log(req.body);
        const { user } = await verifyToken(req);
        if (!user) throw new Error("User Token verification Error");
        const { _id } = user;

        delete req.body.name;
        delete req.body.username;
        delete req.body.password;

        console.log(_id);

        const updated_user = await User.findOneAndUpdate(
          _id,
          { $set: req.body },
          {
            new: true,
          }
        );
        console.log(updated_user);
        res.status(201).json({ success: true, user: updated_user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
