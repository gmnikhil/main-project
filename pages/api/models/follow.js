import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    entity: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    follower: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Follow || mongoose.model("Follow", followSchema);
