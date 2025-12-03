import mongoose, { Schema, Document } from 'mongoose';
import { IAccountsCompany } from './accountCompany.model';

export interface IJob extends Document {
  companyId: mongoose.Types.ObjectId | IAccountsCompany;
  title: string;
  salaryMin?: string;
  salaryMax?: string;
  position?: string;
  workingForm?: string;
  technologies?: string[];
  description?: string;
  images?: string[];
  isDeleted?: boolean;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AccountsCompany',
      required: true,
    },
    title: { type: String, required: true },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    position: { type: String },
    workingForm: { type: String },
    technologies: { type: [String], default: [] },
    description: { type: String },
    images: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>('Job', JobSchema, 'job');
