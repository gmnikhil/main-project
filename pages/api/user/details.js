import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import User from "../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        await verifyToken(req);
        const { user_id: _id } = req.body;
        if (!_id) throw new Error("No user");
        const d = await User.findById(_id).exec();
        res.status(200).json({ success: true, user: d });
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
