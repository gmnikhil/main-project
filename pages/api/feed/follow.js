import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Follow from "../models/follow";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await verifyToken(req);
        const fdocs = await Follow.find(req.query).exec();
        res.status(200).json({ success: true, fdocs });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        await verifyToken(req);
        await Follow.create(req.body);
        res.status(201).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        await verifyToken(req);

        await Follow.deleteMany(req.query);

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
