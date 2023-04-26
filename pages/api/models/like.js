import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    likerType: {
      type: String,
      enum: ["user", "company"],
      required: true,
    },
    liker: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "likerType",
      required: true,
    },
    post_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Like || mongoose.model("Like", likeSchema);
