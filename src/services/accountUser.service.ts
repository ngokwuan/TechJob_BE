import { AccountsUser, IAccountsUser } from '../models/accountUser.model';

export const getUserById = async (
  id: string
): Promise<IAccountsUser | null> => {
  return AccountsUser.findById(id).select('fullName email role avatar');
};
export const getUserByEmail = async (
  email: string
): Promise<IAccountsUser | null> => {
  return AccountsUser.findOne({ email }).select('fullName email role avatar');
};

export const updateUserById = async (
  id: string,
  updateData: Partial<IAccountsUser>
): Promise<IAccountsUser | null> => {
  return AccountsUser.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('fullName email role avatar phone gender');
};
