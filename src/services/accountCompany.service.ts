import {
  AccountsCompany,
  IAccountsCompany,
} from '../models/accountCompany.model';

export const getCompanyById = async (
  id: string
): Promise<IAccountsCompany | null> => {
  return AccountsCompany.findById(id).select(
    'companyName address cityId companyEmployees companyModel description phone workOverTime workingTime logo'
  );
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
export const getAllCompanies = async () => {
  return AccountsCompany.find({
    isDeleted: false,
  }).sort({ createdAt: -1 });
};
export const getAllCompaniesForAdmin = async () => {
  return AccountsCompany.find().sort({ createdAt: -1 });
};
