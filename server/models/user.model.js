import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["citizen", "officer"],
      default: "citizen",
    },
    profilePic: {
      type: String,
    },
    status: {
      type: String,
      enum: ["verified", "unverified"],
      default: "unverified",
    },
    verifyToken: {
      type: String,
      default: null,
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
