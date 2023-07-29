import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    creatorType: {
      type: String,
      enum: ["user", "company"],
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Search || mongoose.model("Search", searchSchema);
