import mongoose, { Schema, Document } from 'mongoose';
import { IAccountsCompany } from './accountCompany.model';

export interface IJob extends Document {
  companyId: mongoose.Types.ObjectId | IAccountsCompany;
  title: string;
  salaryMin?: string;
  salaryMax?: string;
  position?: string;
  workingForm?: boolean;
  technologies?: string;
  description?: string;
  images?: string;
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
    salaryMin: { type: String },
    salaryMax: { type: String },
    position: { type: String },
    workingForm: { type: Boolean },
    technologies: { type: String },
    description: { type: String },
    images: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>('Job', JobSchema);
