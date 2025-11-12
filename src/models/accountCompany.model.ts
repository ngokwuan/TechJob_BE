import mongoose, { Schema, Document } from 'mongoose';
import { ICity } from './city.model';

export interface IAccountsCompany extends Document {
  companyName: string;
  email: string;
  password: string;
  address?: string;
  cityID?: mongoose.Types.ObjectId | ICity;
  companyEmployees?: string;
  companyModel?: string;
  description?: string;
  phone?: string;
  workOverTime?: string;
  workingTime?: string;
  logo?: string;
  status?: string;
  role?: string;
  deletedAt?: Date | null;
}

const AccountsCompanySchema: Schema<IAccountsCompany> = new Schema(
  {
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    cityID: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    companyEmployees: { type: String },
    companyModel: { type: String },
    description: { type: String },
    phone: { type: String },
    workOverTime: { type: String },
    workingTime: { type: String },
    logo: { type: String },
    status: { type: String },
    role: { type: String, default: 'company' },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const AccountsCompany = mongoose.model<IAccountsCompany>(
  'AccountsCompany',
  AccountsCompanySchema
);
