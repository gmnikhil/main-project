import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Company from "../models/company";
import User from "../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await verifyToken(req);
        const users = await User.find({}).lean().exec();
        const companies = await Company.find({}).lean().exec();
        res.status(200).json({ success: true, users, companies });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        await verifyToken(req);
        const { _id } = req.body;
        if (!_id) {
          throw new Error("No id");
        }
        let r = await User.findById(_id).lean().exec();
        if (!r) {
          r = await Company.findById(_id).lean().exec();
          if (!r) {
            throw new Error("No such id");
          }
        }
        console.log(req.body);
        console.log(r);
        res.status(200).json({ success: true, recProfile: r });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
