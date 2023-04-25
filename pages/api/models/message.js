import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //ref: ["User", "Company"],
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //ref: ["User", "Company"],
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
