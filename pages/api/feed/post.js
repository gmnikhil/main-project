import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Post from "../models/post";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const x = await verifyToken();
        if (x.type == "company") {
          if (req.body.creator != x.company._id)
            throw new Error("Unauthorized Posting");
        } else {
          if (req.body.creator != x.user._id)
            throw new Error("Unauthorized Posting");
        }
        req.body.creatorType = x.type;
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const x = await verifyToken();
        if (x.type == "company") {
          if (req.body.creator != x.company._id)
            throw new Error("Unauthorized Deletion");
        } else {
          if (req.body.creator != x.user._id)
            throw new Error("Unauthorized Deletion");
        }
        const { post_id: _id, creator } = req.body;
        console.log(req.body);
        const post = await Post.findOneAndUpdate(
          { _id, creator },
          { deleted: true },
          { new: true }
        );
        if (!post) throw "No such post";
        else console.log(post);
        res.status(201).json({ success: true, post });
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
