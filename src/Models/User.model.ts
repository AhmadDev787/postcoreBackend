import { Document, Schema, model } from "mongoose";

import userInterface from "./Interfaces/userInterface";

const userSchema = new Schema<userInterface>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, index: true },
    name: { type: String },
    avatarUrl: { type: String },
    globalRole: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);
const User = model<userInterface>("User", userSchema);
export default User;
