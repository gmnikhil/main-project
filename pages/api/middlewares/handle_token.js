import User from "../models/user";
import { verify } from "jsonwebtoken";

export async function verifyUserToken(req) {
  const header = req.headers.authorization;
  if (!header) throw new Error("No Header. Access denied");
  if (!header.startsWith("Bearer "))
    throw new Error("Incorrect Auth Header. Access denied");

  const token = header.split(" ")[1];

  const { _id, type } = verify(token, process.env.TOKEN_SECRET);

  const user = await User.findById(_id).lean().exec();
  if (!user) throw new Error("Invalid Token");
  return user;
}
