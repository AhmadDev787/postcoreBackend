import { Schema, model } from "mongoose";

import integrationInterface from "./Interfaces/integrationInterface";

const integrationSchema = new Schema<integrationInterface>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    platform: { type: String, required: true },
    tokenEncrypted: { type: String }, // encrypted token or vault reference - do NOT store plaintext
    refreshTokenEncrypted: { type: String },
    accountId: String, // external account id
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);
integrationSchema.index({ workspaceId: 1, platform: 1 });

const Integration = model("Integration", integrationSchema);
export default Integration;
