import { model, Schema } from "mongoose";
import jobInterface from "./Interfaces/jobInterface";

const jobSchema = new Schema<jobInterface>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    type: {
      type: String,
      enum: ["publish", "refresh_metrics", "export", "sync_platform"],
      required: true,
    },
    payload: Schema.Types.Mixed,
    scheduledAt: { type: Date, index: true },
    attempts: { type: Number, default: 0 },
    lastError: String,
    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);
jobSchema.index({ scheduledAt: 1, status: 1 });

const Job = model("Job", jobSchema);
export default Job;
