import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
