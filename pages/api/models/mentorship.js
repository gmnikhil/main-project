import mongoose from "mongoose";

const mentorshipSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
    },
    date_time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Mentorship ||
  mongoose.model("Mentorship", mentorshipSchema);
