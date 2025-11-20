import { Document, Types } from "mongoose";
interface mediaInterface extends Document {
  workspaceId: Types.ObjectId;
  uploadedByClerkId: string;
  provider: "s3" | "cloudinary" | "gcs";
  providerKey: string;
  url: string;
  type: "image" | "video" | "gif" | "other";
  width: number;
  height: number;
  sizeBytes: number;
  mimeType: string;
  tags: [string];
  metadata: any;
}
export default mediaInterface;
