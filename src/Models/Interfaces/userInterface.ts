import { Document } from "mongoose";
interface userInterface extends Document {
  clerkId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  globalRole: "user" | "admin" | "superadmin";
}
export default userInterface;
