import dbConnect from "../lib/db";
import Company from "../models/company";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { password, name, email } = req.body;

        if (!password || !name || !email) throw new Error("Invalid Request");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const company = await Company.create({
          password: hash,
          name,
          email,
        });

        const token = sign(
          { _id: company._id.toJSON(), type: "company" },
          process.env.TOKEN_SECRET
        );

        delete company.password;

        res.status(201).json({ success: true, company, token });
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
