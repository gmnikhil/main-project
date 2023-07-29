import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import User from "../models/user";
import Company from "../models/company";
import Post from "../models/post";
import Like from "../models/like";
import Follow from "../models/follow";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  // Define the discriminator model

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
        const posts = [];

        const following = await Follow.find({ follower: creator }).exec();

        for (let i = 0; i < following.length; i++) {
          let f = following[i];
          const p = await Post.find({ creator: f.entity })
            .sort({ createdAt: -1 })
            .exec();
          const populatedPosts = await Promise.all(
            p.map(async (post) => {
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
          posts.push(populatedPosts);
        }

        const p = await Post.find({ creator }).sort({ createdAt: -1 }).exec();
        const populatedPosts = await Promise.all(
          p.map(async (post) => {
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
        posts.push(populatedPosts);

        const flattened = posts.flat();

        res.status(201).json({ success: true, posts: flattened });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const x = await verifyToken(req);
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
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const x = await verifyToken(req);
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
