import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  email: {
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
  about: {
    type: String,
  },
  work: {
    type: String,
  },
  environment: {
    type: String,
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
});

export default mongoose.models.Company ||
  mongoose.model("Company", companySchema);
