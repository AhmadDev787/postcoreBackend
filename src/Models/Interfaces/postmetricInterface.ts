import { Document, Types } from "mongoose";
export default interface postmetricInterface extends Document {
  postId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  reach: number;
  extra: any;
}
