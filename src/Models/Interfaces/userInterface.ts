import { Document } from "mongoose";
interface userInterface extends Document {
  clerkId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  globalRole: "user" | "admin" | "superadmin";
  onboardingCompleted: boolean;
  userProfile: any;
}
export default userInterface;
