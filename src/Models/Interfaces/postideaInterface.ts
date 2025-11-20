import { Types, Document } from "mongoose";

export default interface postideaInterface extends Document {
  workspaceId: Types.ObjectId;
  title: string;
  caption: string;
  hashtags: [string];
  imagePrompts: string;
  generatedBy: "ai" | "user";
  aiModel: string;
  score: number;
  createdByClerkId: string;
}
