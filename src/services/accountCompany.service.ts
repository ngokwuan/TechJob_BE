import {
  AccountsCompany,
  IAccountsCompany,
} from '../models/accountCompany.model';

export const getCompanyById = async (
  id: string
): Promise<IAccountsCompany | null> => {
  return AccountsCompany.findById(id).select('companyName email role logo');
};
