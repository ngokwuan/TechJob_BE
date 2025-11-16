import mongoose, { Schema, Document } from 'mongoose';
import { IJob } from './job.model';
import { IAccountsUser } from './accountUser.model';

export type CVStatus = 'Pending' | 'Rejected' | 'Accepted';

export interface ICV extends Document {
  jobId: mongoose.Types.ObjectId | IJob;
  userId: mongoose.Types.ObjectId | IAccountsUser;
  fullName: string;
  email: string;
  phone?: string;
  fileCV: string;
  viewed?: boolean;
  status: CVStatus;
}

const CVSchema: Schema<ICV> = new Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    fileCV: { type: String, required: true },
    viewed: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['Pending', 'Rejected', 'Accepted'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export const CV = mongoose.model<ICV>('CV', CVSchema, 'cv');
