import { model, Schema } from "mongoose";
import workspaceInterface from "./Interfaces/workspaceInterface";

const workspaceSchema = new Schema<workspaceInterface>(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    ownerClerkId: { type: String, required: true, index: true },
    billingCustomerId: { type: String }, // Stripe or other
    plan: { type: String, default: "free" },
    settings: { type: Schema.Types.Mixed },
    trial: {
      isActive: { type: Boolean, default: true },
      startedAt: { type: Date, default: () => new Date() },
      endsAt: { type: Date },
    },
  },
  { timestamps: true }
);
const Workspace = model("Workspace", workspaceSchema);

export default Workspace;
