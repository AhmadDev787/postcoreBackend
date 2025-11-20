import { model, Schema } from "mongoose";
import postmetricInterface from "./Interfaces/postmetricInterface";
const postmetricSchema = new Schema<postmetricInterface>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    reach: { type: Number, default: 0 },
    extra: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const PostMetric = model("PostMetric", postmetricSchema);
export default PostMetric;
