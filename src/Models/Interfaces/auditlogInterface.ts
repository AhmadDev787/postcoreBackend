import { Document, Types } from "mongoose";

export default interface auditlogInterface extends Document {
  workspaceId: Types.ObjectId;
  actorClerkId: string;
  action: string;
  details: any;
}
