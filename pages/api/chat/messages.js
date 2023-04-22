import { verifyToken } from "../middlewares/handle_token";
import Message from "../models/message";

export default async function handler(req, res) {
  switch (method) {
    case "GET":
      try {
        const { _id: userId } = await verifyToken(req);
        const messages = await Message.find({
          $or: [{ sender: userId }, { recipient: userId }],
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
