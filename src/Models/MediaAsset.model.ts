import { model, Schema } from "mongoose";
import mediaInterface from "./Interfaces/mediaInterface";

const mediaSchema = new Schema<mediaInterface>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    uploadedByClerkId: { type: String, index: true },
    provider: {
      type: String,
      enum: ["s3", "cloudinary", "gcs"],
      default: "s3",
    },
    providerKey: { type: String }, // provider object key or public id
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ["image", "video", "gif", "other"],
      default: "image",
    },
    width: Number,
    height: Number,
    sizeBytes: Number,
    mimeType: String,
    tags: [String],
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const Media = model<mediaInterface>("Media", mediaSchema);
export default Media;
