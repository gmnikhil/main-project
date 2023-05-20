import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  skills: {
    type: [String],
  },
  interests: {
    type: [String],
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  qualification: {
    type: String,
  },
  headline: {
    type: String,
  },
  cgpa: {
    type: String,
  },
  industry: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
  about: {
    type: String,
  },
  education: {
    type: String,
  },
  honours: {
    type: String,
  },
  projects: {
    type: String,
  },
  work_profile: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
