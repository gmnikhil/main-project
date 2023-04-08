import dbConnect from "./lib/db";
import { verifyUserToken } from "./middlewares/handle_token";
import User from "./models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await verifyUserToken(req);
        res.status(200).json({ success: true, user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        console.log(req.body);
        const { _id } = await verifyUserToken(req);
        const user = await User.findOneAndUpdate(_id, req.body, {
          new: true,
        });
        res.status(201).json({ success: true, user });
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
