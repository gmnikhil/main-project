import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Comment from "../models/comment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await verifyToken(req);
        const comments = await Comment.find(req.query)
          .populate({
            path: "commentor",
            model: function (doc) {
              if (doc.commentorType === "user") {
                return "User";
              } else {
                return "Company";
              }
            },
          })
          .lean()
          .exec();
        console.log(comments);
        res.status(200).json({ success: true, comments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const x = await verifyToken();
        if (x.type == "company") {
          if (req.body.commentor != x.company._id)
            throw new Error("Unauthorized Comment");
        } else {
          if (req.body.commentor != x.user._id)
            throw new Error("Unauthorized Comment");
        }
        req.body.commentorType = x.type;
        const comment = await Comment.create(req.body);
        res.status(201).json({ success: true, comment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
