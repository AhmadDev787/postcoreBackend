import { model, Schema } from "mongoose";
import hashtagSetInterface from "./Interfaces/hashtagSetInterface";

const hashtagSetSchema = new Schema<hashtagSetInterface>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    name: String,
    hashtags: [String],
    createdByClerkId: String,
  },
  { timestamps: true }
);

const HashtagSet = model<hashtagSetInterface>("HashtagSet", hashtagSetSchema);
export default HashtagSet;
