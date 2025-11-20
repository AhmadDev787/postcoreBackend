import { model, Schema } from "mongoose";
import postideaInterface from "./Interfaces/postideaInterface";

const postideaSchema = new Schema<postideaInterface>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    title: { type: String },
    caption: { type: String },
    hashtags: [String],
    imagePrompts: [String],
    generatedBy: { type: String, enum: ["ai", "user"], default: "ai" },
    aiModel: String,
    score: Number, // optional ranking from AI
    createdByClerkId: String,
  },
  { timestamps: true }
);
const PostIdea = model<postideaInterface>("PostIdea", postideaSchema);
export default PostIdea;
