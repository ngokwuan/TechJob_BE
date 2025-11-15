import { Request } from 'express';

export interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  validated?: any;
  user?: JWTPayload;
  token?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterUserInput {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: string;
}

export interface RegisterCompanyInput {
  companyName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  cityID?: string;
  companyEmployees?: string;
  companyModel?: string;
  description?: string;
  workOverTime?: string;
  workingTime?: string;
  logo?: string;
}
