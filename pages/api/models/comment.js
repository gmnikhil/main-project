import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentorType: {
      type: String,
      enum: ["user", "company"],
      required: true,
    },
    commentor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    post_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
