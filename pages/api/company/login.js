import dbConnect from "../lib/db";
import company from "../models/company";
import Company from "../models/company";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;

        if (!email || !password) throw new Error("Invalid Request");

        const company = await Company.findOne({ email })
          .select("+password")
          .lean()
          .exec();
        if (!company) throw new Error("Invalid Email");

        const correct = await bcrypt.compare(password, company.password);
        delete company.password;

        if (!correct) throw new Error("Incorrect password");

        const token = sign(
          { _id: company._id.toJSON(), type: "company" },
          process.env.TOKEN_SECRET
        );

        res.status(200).json({ success: true, company, token });
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
