import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AccountsUser, IAccountsUser } from '../models/accountUser.model';
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

const blacklist = new Set<string>();

export const removeToken = async (token: string) => {
  blacklist.add(token);
};

export const isBlacklisted = async (token: string) => {
  return blacklist.has(token);
};
