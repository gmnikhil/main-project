import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Message from "../models/message";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const x = await verifyToken(req);
        const { recipient } = req.body;

        if (!recipient) throw new Error("No such recipient");

        let _id;
        if (x.type == "user") _id = x.user._id;
        else _id = x.company._id;

        const messages = await Message.find({
          $or: [
            { from: _id, to: recipient },
            { to: _id, from: recipient },
          ],
        })
          .sort({ createdAt: "asc" })
          .lean()
          .exec();

        res.status(200).json({ messages });
      } catch (error) {
        // Handle error
        res.status(500).json({ error: "Failed to fetch messages" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
