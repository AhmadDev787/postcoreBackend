import { Document, Types } from "mongoose";

export default interface integrationInterface extends Document {
  workspaceId: Types.ObjectId;
  platform: string;
  tokenEncrypted: string; // encrypted token or vault reference - do NOT store plaintext
  refreshTokenEncrypted: string;
  accountId: string; // external account id
  metadata: any;
}
