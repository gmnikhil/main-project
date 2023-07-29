import dbConnect from "./lib/db";
import { verifyToken } from "./middlewares/handle_token";
import Search from "./models/search";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const x = await verifyToken(req);
        let creator;
        if (x.type == "company") {
          creator = x.company._id;
        } else {
          creator = x.user._id;
        }
        const searchTerms = await Search.aggregate([
          { $match: { creator: creator } },
          {
            $group: {
              _id: "$term",
              documents: { $push: "$$ROOT" },
            },
          },
        ]);
        //.find({ creator }).exec();
        res.status(200).json({ success: true, searchTerms });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
