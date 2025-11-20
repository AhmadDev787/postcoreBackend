import { Document, Types } from "mongoose";
interface membershipInterface extends Document {
  workspaceId: Types.ObjectId;
  clerkId: string;
  role: string;
  invitedBy: string;
  status: "active" | "invited" | "suspended" | "blocked";
}
export default membershipInterface;
