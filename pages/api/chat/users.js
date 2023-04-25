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
    default:
      res.status(400).json({ success: false });
      break;
  }
}
