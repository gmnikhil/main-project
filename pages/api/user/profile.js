import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import User from "../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await verifyToken(req);
        res.status(200).json({ success: true, user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        console.log(req.body);
        const { _id } = await verifyToken(req);
        const user = await User.findOneAndUpdate(_id, req.body, {
          new: true,
        });
        res.status(201).json({ success: true, user });
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
