import { Document, Types } from "mongoose";

export default interface jobInterface extends Document {
  workspaceId: Types.ObjectId;
  type: "publish" | "refresh_metrics" | "export" | "sync_platform";
  payload: any;
  scheduledAt: Date;
  attempts: number;
  lastError: string;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
}
