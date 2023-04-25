import dbConnect from "../lib/db";
import { verifyToken } from "../middlewares/handle_token";
import Company from "../models/company";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { company } = await verifyToken(req);
        if (!company) throw new Error("Company Token verification Error");
        res.status(200).json({ success: true, company });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        console.log(req.body);
        const { company } = await verifyToken(req);
        if (!company) throw new Error("Company Token verification Error");
        const { _id } = company;
        const updated_company = await Company.findOneAndUpdate(_id, req.body, {
          new: true,
        });
        res.status(201).json({ success: true, company: updated_company });
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
