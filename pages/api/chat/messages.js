import { verifyToken } from "../middlewares/handle_token";
import Message from "../models/message";

export default async function handler(req, res) {
  switch (method) {
    case "GET":
      try {
        const x = await verifyToken(req);

        let _id;
        if (x.type == "user") _id = x.user._id;
        else _id = x.company._id;

        const messages = await Message.find({
          $or: [{ sender: _id }, { recipient: _id }],
        }).sort({ createdAt: "asc" });

        res.json(messages);
      } catch (error) {
        // Handle error
        res.status(500).json({ error: "Failed to fetch messages" });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
