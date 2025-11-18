import { Request } from 'express';

export interface JWTPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest<T = any> extends Request {
  validated?: T;
  user?: JWTPayload;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterUserInput {
  fullName: string;
  email: string;
  password: string;
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
