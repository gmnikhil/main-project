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
        const liked = await Like.findOne({ liker, post_id }).lean().exec();
        if (liked) res.status(200).json({ success: true, liked: !!liked });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const x = await verifyToken(req);
        if (x.type == "company") {
          if (req.body.liker != x.company._id)
            throw new Error("Unauthorized Like");
        } else {
          if (req.body.liker != x.user._id)
            throw new Error("Unauthorized Like");
        }
        req.body.likerType = x.type;
        await Like.create(req.body);
        res.status(201).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const x = await verifyToken(req);

        if (x.type == "company") {
          if (req.query.liker != x.company._id)
            throw new Error("Unauthorized Unlike");
        } else {
          if (req.query.liker != x.user._id)
            throw new Error("Unauthorized Unlike");
        }
        const { post_id, liker } = req.query;

        await Like.findOneAndDelete({ post_id, liker });

        res.status(200).json({ success: true });
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
