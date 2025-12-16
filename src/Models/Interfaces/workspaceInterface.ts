import { Document } from "mongoose";
interface workspaceSettings {
  [key: string]: any;
}

interface workspaceInterface extends Document {
  name: string;
  slug: string;
  ownerClerkId: string;
  billingCustomerId: string;
  plan: string;
  settings?: workspaceSettings;
  trial: { isActive: boolean; startedAt: Date; endsAt: Date };
}
export default workspaceInterface;
