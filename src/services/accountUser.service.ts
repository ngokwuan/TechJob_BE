import { PipelineStage } from 'mongoose';
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
export const getAllUsersForAdmin = async (page = 1) => {
  const LIMIT = 10;
  const skip = (page - 1) * LIMIT;

  const basePipeline: PipelineStage[] = [
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
    {
      $lookup: {
        from: 'cv',
        localField: '_id',
        foreignField: 'userId',
        as: 'appliedCVs',
      },
    },
    {
      $addFields: {
        totalJobApplied: { $size: '$appliedCVs' },
      },
    },
    {
      $project: {
        appliedCVs: 0,
      },
    },
  ];

  const [data, total] = await Promise.all([
    AccountsUser.aggregate([
      ...basePipeline,
      { $skip: skip },
      { $limit: LIMIT },
    ]),
    AccountsUser.aggregate([...basePipeline, { $count: 'count' }]),
  ]);

  return {
    totalPage: Math.ceil((total[0]?.count || 0) / LIMIT),
    data,
  };
};
export const getAllLockUser = async () => {
  return AccountsUser.find({ isDeleted: true }).select('_id');
};
export const updateStatusUser = async (id: string) => {
  const user = await AccountsUser.findById(id).select('_id fullName isDeleted');
  if (!user) return null;

  user.isDeleted = !user.isDeleted;
  await user.save();

  return user;
};
export const getAllUsersForDashboardAdmin = async () => {
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
    {
      $lookup: {
        from: 'cv',
        localField: '_id',
        foreignField: 'userId',
        as: 'appliedCVs',
      },
    },
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
