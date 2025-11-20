import { Schema, model } from "mongoose";
import notificatiionInterface from "./Interfaces/notificationInterface";

const notificatiionSchema = new Schema<notificatiionInterface>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    clerkId: String,
    type: String,
    payload: Schema.Types.Mixed,
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificatiionSchema);
export default Notification;
