import { Schema, model } from "mongoose";
import templateInterface from "./Interfaces/templateInterface";

const templateSchema = new Schema<templateInterface>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    title: { type: String, required: true },
    body: { type: String },
    hashtags: [String],
    variables: [String], // placeholders like {{productName}}
    createdByClerkId: String,
  },
  { timestamps: true }
);

const Template = model<templateInterface>("Template", templateSchema);
export default Template;
