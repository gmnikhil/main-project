import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Comment from "../models/comment";
import User from "../models/user";
import Company from "../models/company";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await verifyToken(req);
        const comments = await Comment.find(req.query).lean().exec();
        const populatedComments = await Promise.all(
          comments.map(async (comment) => {
            if (comment.commentorType === "user") {
              const user = await User.findById(comment.commentor).lean().exec();
              return { ...comment, commentor: user };
            } else {
              const company = await Company.findById(comment.commentor)
                .lean()
                .exec();
              return { ...comment, commentor: company };
            }
          })
        );
        res.status(200).json({ success: true, comments: populatedComments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const x = await verifyToken(req);
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
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
