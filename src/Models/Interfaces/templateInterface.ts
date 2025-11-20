import { Document, Types } from "mongoose";

export default interface templateInterface extends Document {
  workspaceId: Types.ObjectId;
  title: string;
  body: string;
  hashtags: [string];
  variables: [string];
  createdByClerkId: string;
}
