import mongoose from "mongoose";
import dbConnect from "./lib/db";
import { verifyToken } from "./middlewares/handle_token";
import Mentorship from "./models/mentorship";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await verifyToken(req);
        const requests = await Mentorship.find(req.query)
          .populate("mentor")
          .populate("mentee")
          .exec();
        res.status(200).json({ success: true, requests });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        await verifyToken(req);
        console.log(req.body);
        const mentorshipId = new mongoose.Types.ObjectId(req.body._id);
        const updated = await Mentorship.findOneAndUpdate(
          { _id: mentorshipId, status: "pending" },
          { $set: { mentee: req.body.mentee, status: "progress" } },
          { new: true }
        ).exec();
        console.log(updated);
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const x = await verifyToken(req);
        const m = await Mentorship.create(req.body);
        res.status(201).json({ success: true, request: m });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        await verifyToken(req);

        await Mentorship.findOneAndDelete(req.query);

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
