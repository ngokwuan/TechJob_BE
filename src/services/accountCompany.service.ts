import {
  AccountsCompany,
  IAccountsCompany,
} from '../models/accountCompany.model';

export const getCompanyById = async (
  id: string
): Promise<IAccountsCompany | null> => {
  return AccountsCompany.findById(id).select('companyName email role logo');
};
export const updateCompanyById = async (
  id: string,
  data: Partial<IAccountsCompany>
): Promise<IAccountsCompany | null> => {
  return AccountsCompany.findByIdAndUpdate(id, data, {
    new: true,
  }).select(
    'companyName address cityId companyEmployees companyModel description phone workOverTime workingTime logo'
  );
};
