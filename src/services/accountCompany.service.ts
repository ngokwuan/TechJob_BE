import {
  AccountsCompany,
  IAccountsCompany,
} from '../models/accountCompany.model';

export const updateStatusCPN = async (id: string) => {
  const cpn = await AccountsCompany.findByIdAndUpdate(id, {
    isDeleted: true,
  }).select('-password -updatedAt');
  return cpn;
};
export const checkExistCPN = async (id: string) => {
  return await AccountsCompany.findById(id);
};
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
  return AccountsCompany.aggregate([
    {
      $match: { isDeleted: false },
    },
    {
      $lookup: {
        from: 'job',
        localField: '_id',
        foreignField: 'companyId',
        pipeline: [{ $match: { isDeleted: false } }],
        as: 'jobs',
      },
    },
    {
      $addFields: {
        totalJob: { $size: '$jobs' },
      },
    },
    {
      $lookup: {
        from: 'city',
        localField: 'cityId',
        foreignField: '_id',
        as: 'city',
      },
    },
    {
      $unwind: {
        path: '$city',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        password: 0,
        jobs: 0,
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
};

export const getAllCompaniesForAdmin = async () => {
  const companies = await AccountsCompany.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        companyName: 1,
        email: 1,
        isDeleted: 1,
        logo: 1,
        companyEmployees: 1,
      },
    },
    // Lấy danh sách job của công ty
    {
      $lookup: {
        from: 'job',
        localField: '_id',
        foreignField: 'companyId',
        as: 'jobs',
      },
    },
    // Lấy CV theo danh sách job._id
    {
      $lookup: {
        from: 'cv',
        let: { jobIds: '$jobs._id' },
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$jobId', '$$jobIds'] },
            },
          },
        ],
        as: 'cvs',
      },
    },
    {
      $addFields: {
        totalCVs: { $size: '$cvs' },
      },
    },
    // Xoá các field không cần
    {
      $project: {
        jobs: 0,
        cvs: 0,
      },
    },
  ]);

  return companies;
};
