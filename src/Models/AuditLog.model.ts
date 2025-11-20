import { Schema, model } from "mongoose";
import auditlogInterface from "./Interfaces/auditlogInterface";

const auditlogSchema = new Schema<auditlogInterface>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    actorClerkId: String,
    action: String,
    details: Schema.Types.Mixed,
  },
  { timestamps: true }
);
const AuditLog = model("AuditLog", auditlogSchema);
export default AuditLog;
