import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Search from "../models/search";
import User from "../models/user";
import Company from "../models/company";
import Post from "../models/post";
import Like from "../models/like";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const x = await verifyToken(req);
        let creator;
        if (x.type == "company") {
          creator = x.company._id;
        } else {
          creator = x.user._id;
        }
        let { search } = req.query;
        if (!search) throw Error("Invalid query");
        search = search.split("#");

        const regexPattern = search.map((word) => new RegExp(`^${word}`));

        const posts = await Post.find({
          tags: {
            $in: regexPattern,
          },
        }).exec();
        const populatedPosts = await Promise.all(
          posts.map(async (post) => {
            if (post.creatorType === "user") {
              const user = await User.findById(post.creator).lean().exec();
              const liked = await Like.findOne({
                liker: creator,
                post_id: post._id,
              })
                .lean()
                .exec();
              return { ...post._doc, creator: user, liked: !!liked };
            } else {
              const company = await Company.findById(post.creator)
                .lean()
                .exec();
              const liked = await Like.findOne({
                liker: creator,
                post_id: post._id,
              })
                .lean()
                .exec();
              return { ...post._doc, creator: company, liked: !!liked };
            }
          })
        );

        const exact_posts = await Post.find({
          tags: {
            $in: search,
          },
        }).exec();

        if (exact_posts?.length) {
          const documents = search.map((str) => ({
            creatorType: x.type,
            creator: creator,
            term: str,
          }));
          await Search.insertMany(documents);
        }
        res.status(201).json({ success: true, posts: populatedPosts });
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
