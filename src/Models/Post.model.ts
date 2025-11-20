import { model, Schema } from "mongoose";
import postInterface from "./Interfaces/postInterface";

const postSchema = new Schema<postInterface>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    authorClerkId: { type: String, index: true },
    platform: {
      type: String,
      enum: ["instagram", "facebook", "x", "linkedin", "pinterest", "tiktok"],
      required: true,
      index: true,
    },
    content: { type: String },
    media: [{ type: Schema.Types.ObjectId, ref: "MediaAsset" }],
    hashtagSetId: { type: Schema.Types.ObjectId, ref: "HashtagSet" },
    analyticsSnapshot: Schema.Types.Mixed, // denormalized top metrics after publish

    // Scheduling & publishing
    status: {
      type: String,
      enum: [
        "draft",
        "scheduled",
        "queued",
        "published",
        "failed",
        "cancelled",
      ],
      default: "draft",
      index: true,
    },
    scheduledAt: { type: Date, index: true },
    externalPostId: { type: String }, // platform post id
    externalMeta: Schema.Types.Mixed,

    // Versioning for optimistic concurrency
    version: { type: Number, default: 0 },
  },
  { timestamps: true }
);
postSchema.index({ workspaceId: 1, status: 1, scheduledAt: 1 });
postSchema.index({ workspaceId: 1, platform: 1, postedAt: -1 });
const Post = model<postInterface>("Post", postSchema);
export default Post;
