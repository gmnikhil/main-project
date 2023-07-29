import User from "../models/user";
import Company from "../models/company";
import { verify } from "jsonwebtoken";

export async function verifyToken(req) {
  const header = req.headers.authorization;
  if (!header) throw new Error("No Header. Access denied");
  if (!header.startsWith("Bearer "))
    throw new Error("Incorrect Auth Header. Access denied");

  const token = header.split(" ")[1];

  const { _id, type } = verify(token, process.env.TOKEN_SECRET);
  if (type == "user") {
    const user = await User.findById(_id).lean().exec();
    if (!user) throw new Error("Invalid Token");
    return { user, type };
  } else if (type == "company") {
    const company = await Company.findById(_id).lean().exec();
    if (!company) throw new Error("Invalid Token");
    return { company, type };
  }
  throw new Error("Token Error");
}
