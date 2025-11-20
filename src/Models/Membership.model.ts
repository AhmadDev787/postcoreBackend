import { model, Schema, Types } from "mongoose";
import membershipInterface from "./Interfaces/membershipInterface";

const membershipSchema = new Schema<membershipInterface>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    clerkId: { type: String, required: true, index: true },
    role: {
      type: String,
      enum: ["owner", "admin", "editor", "viewer"],
      default: "viewer",
    },
    invitedBy: { type: String }, // clerkId of inviter
    status: {
      type: String,
      enum: ["active", "invited", "suspended", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);
membershipSchema.index({ workspaceId: 1, clerkId: 1 }, { unique: true });
const Membership = model<membershipInterface>("Membership", membershipSchema);
export default Membership;
