import { Document, Types } from "mongoose";

export default interface hashtagSetInterface extends Document {
  workspaceId: Types.ObjectId;
  name: string;
  hashtags: [string];
  createdByClerkId: string;
}
