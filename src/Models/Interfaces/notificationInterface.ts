import { Document, Types } from "mongoose";
export default interface notificatiionInterface extends Document {
  workspaceId: Types.ObjectId;
  clerkId: string;
  type: string;
  payload: any;
  read: boolean;
}
