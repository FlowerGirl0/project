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
    elementry: {
      type: Boolean,
      required: false,
    },
    secondery: {
      type: Boolean,
      required: false,
    },
    hospital: {
      type: Boolean,
      required: false,
    },
    gym: {
      type: Boolean,
      required: false,
    },
    mall: {
      type: Boolean,
      required: false,
    },
    grocery: {
      type: Boolean,
      required: false,
    },
    park: {
      type: Boolean,
      required: false,
    }
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
