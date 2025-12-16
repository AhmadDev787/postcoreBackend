import { Schema, model } from "mongoose";

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
    onboardingCompleted: { type: Boolean, default: false },
    userProfile: {
      persona: {
        type: String,
        enum: ["business_owner", "influencer", "marketer", "other"],
      },
      businessInfo: {
        businessName: String,
        role: String,
        size: String,
        industry: String,
      },
      brandVoice: String, // step 3
      targetAudience: [String], // step 3
      contentGoals: [String], // step 3
      preferredFormats: [String], // ⭐ reels, blogs, carousels, tweets  step 4
      offers: [String], // ⭐ services / products  step 4
      uniqueValue: {
        type: String,
        default: "",
      }, // optional  step 4
    },
  },
  { timestamps: true }
);
const User = model<userInterface>("User", userSchema);
export default User;
