import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Like from "../models/like";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await verifyToken(req);
        const { liker, post_id } = req.query;
        if (!liker || !post_id) throw new Error("Invalid Parameters");
        const liked = await Like.findOne({ liker, post_id })
          .populate("liker")
          .lean()
          .exec();
        if (liked) res.status(200).json({ success: true, liked: !!liked });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        await verifyToken(req);
        await Like.create(req.body);
        res.status(201).json({ success: true });
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
