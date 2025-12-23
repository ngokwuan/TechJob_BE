import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AccountsUser, IAccountsUser } from '../models/accountUser.model';
import connectRedis from '../config/redis';
import {
  AccountsCompany,
  IAccountsCompany,
} from '../models/accountCompany.model';
import { RegisterUserInput, RegisterCompanyInput } from '../types/auth.type';

const AccountModels = {
  user: AccountsUser,
  company: AccountsCompany,
} as const;

export type AccountModel = keyof typeof AccountModels;
type AccountDocument = IAccountsUser | IAccountsCompany;

export const findAccount = async (
  email: string,
  type: AccountModel
): Promise<AccountDocument | null> => {
  const Model = AccountModels[type] as Model<AccountDocument>;
  return Model.findOne({ email, isDeleted: false }).exec();
};

export const loginAccount = async (
  email: string,
  password: string,
  type: AccountModel
): Promise<any> => {
  try {
    const account = await findAccount(email, type);
    if (!account) return null;

    const valid = await bcrypt.compare(password, account.password);
    if (!valid) return null;

    const { password: _, ...accountObj } = account.toObject();

    return accountObj;
  } catch (error) {
    console.error('Login account error:', error);
    return null;
  }
};

export const registerAccount = async (
  data: RegisterUserInput | RegisterCompanyInput,
  type: AccountModel
): Promise<any> => {
  try {
    const Model = AccountModels[type] as Model<AccountDocument>;

    const exists = await Model.findOne({ email: data.email }).exec();
    if (exists) return null;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newAccount = await Model.create({
      ...data,
      password: hashedPassword,
    });

    const { password: _, ...accountObj } = newAccount.toObject();

    return accountObj;
  } catch (error) {
    console.error('Register account error:', error);
    return null;
  }
};

export const removeToken = async (token: string) => {
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload | null;

    if (!decoded?.exp) return;

    const now = Math.floor(Date.now() / 1000);
    const ttl = Math.max(decoded.exp - now, 0);

    if (ttl > 0) {
      await connectRedis.set(`blacklist:${token}`, '1', { EX: ttl });
    }
  } catch (err) {
    console.error('Blacklist token error:', err);
  }
};

export const isBlacklisted = async (token: string): Promise<boolean> => {
  const result = await connectRedis.get(`blacklist:${token}`);
  return result === '1';
};
