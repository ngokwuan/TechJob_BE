import { AccountsUser, IAccountsUser } from '../models/accountUser.model';

export const getUserById = async (
  id: string
): Promise<IAccountsUser | null> => {
  return AccountsUser.findById(id).select('fullName email role avatar');
};
