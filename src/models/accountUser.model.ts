import mongoose, { Schema, Document } from 'mongoose';

export interface IAccountsUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role?: string;
  deletedAt?: Date | null;
}

const AccountsUserSchema: Schema<IAccountsUser> = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const AccountsUser = mongoose.model<IAccountsUser>(
  'AccountsUser',
  AccountsUserSchema
);
