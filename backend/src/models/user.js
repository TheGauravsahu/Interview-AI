import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "username must be unique."],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "email must be unique."],
    },
    password: {
      type: String,
      required: true,
    },
  },{ timestamps: true },
);

export const userModel = mongoose.model("users", userSchema);
