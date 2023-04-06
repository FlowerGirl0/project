import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  }
);

// Create and export the User model
export default mongoose.models.users || mongoose.model("users", userSchema);
