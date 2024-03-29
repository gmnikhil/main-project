import dbConnect from "../lib/db";
import User from "../models/user";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { username, password, name, email } = req.body;

        if (!username || !password || !name || !email)
          throw new Error("Invalid Request");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({
          username,
          password: hash,
          name,
          email,
        });

        const token = sign(
          { _id: user._id.toJSON(), type: "user" },
          process.env.TOKEN_SECRET
        );

        delete user.password;

        res.status(201).json({ success: true, user, token });
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
