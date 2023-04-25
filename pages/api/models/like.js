import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    liker: {
      type: mongoose.Schema.Types.ObjectId,
      //ref: ["User", "Company"],
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
