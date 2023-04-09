import dbConnect from "./lib/db";
import User from "./models/user";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        console.log(req.body);

        const { username, password } = req.body;

        if (!username || !password) throw new Error("Invalid Request");

        const user = await User.findOne({ username })
          .select("+password")
          .lean()
          .exec();
        if (!user) throw new Error("Invalid Username");

        const correct = await bcrypt.compare(password, user.password);
        delete user.password;

        if (!correct) throw new Error("Incorrect password");

        const token = sign(user._id.toJSON(), process.env.TOKEN_SECRET);

        res.status(200).json({ success: true, user, token });
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
