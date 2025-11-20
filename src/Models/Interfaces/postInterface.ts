import { Document, Types } from "mongoose";
export default interface postInterface extends Document {
  workspaceId: Types.ObjectId;
  authorClerkId: string;
  platform:
    | "instagram"
    | "facebook"
    | "x"
    | "linkedin"
    | "pinterest"
    | "tiktok";
  content: string;
  media: [Types.ObjectId];
  hashtagSetId: Types.ObjectId;
  analyticsSnapshot: any; // denormalized top metrics after publish

  // Scheduling & publishing
  status:
    | "draft"
    | "scheduled"
    | "queued"
    | "published"
    | "failed"
    | "cancelled";
  scheduledAt: Date;
  externalPostId: string; // platform post id
  externalMeta: any;

  // Versioning for optimistic concurrency
  version: number;
}
