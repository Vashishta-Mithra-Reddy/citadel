import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVaultItem extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  ciphertext: string;
  iv: string;
}

const VaultItemSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ciphertext: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const VaultItem: Model<IVaultItem> =
  mongoose.models.VaultItem ||
  mongoose.model<IVaultItem>("VaultItem", VaultItemSchema);

export default VaultItem;
