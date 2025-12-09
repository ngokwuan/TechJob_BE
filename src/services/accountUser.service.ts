import { AccountsUser, IAccountsUser } from '../models/accountUser.model';

export const getUserById = async (
  id: string
): Promise<IAccountsUser | null> => {
  return AccountsUser.findById(id).select(
    'fullName email role avatar gender phone'
  );
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
export const getAllUsersForAdmin = async () => {
  const users = await AccountsUser.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        fullName: 1,
        email: 1,
        avatar: 1,
        isDeleted: 1,
      },
    },
    // Lấy toàn bộ CV ứng tuyển theo userId
    {
      $lookup: {
        from: 'cv',
        localField: '_id',
        foreignField: 'userId',
        as: 'appliedCVs',
      },
    },
    // Thêm field count
    {
      $addFields: {
        totalJobApplied: { $size: '$appliedCVs' },
      },
    },
    {
      $project: {
        appliedCVs: 0, // ẩn danh sách cv
      },
    },
  ]);

  return users;
};

export const updateStatusUser = async (id: string) => {
  const user = await AccountsUser.findById(id).select('-password -updatedAt');
  if (!user) return null;

  user.isDeleted = !user.isDeleted;
  await user.save();

  return user;
};
