import mongoose, { Schema, Document } from 'mongoose';

export interface IAccountsUser extends Document {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  avatar?: string;
  status?: string;
  role: string;
  isDeleted: boolean;
}

const AccountsUserSchema = new Schema<IAccountsUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    gender: { type: String },
    avatar: { type: String },
    status: { type: String },
    role: { type: String, default: 'user' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AccountsUser = mongoose.model<IAccountsUser>(
  'AccountsUser',
  AccountsUserSchema,
  'accountUser'
);
