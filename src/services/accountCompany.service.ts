import {
  AccountsCompany,
  IAccountsCompany,
} from '../models/accountCompany.model';

export const updateStatusCPN = async (id: string) => {
  const cpn = await AccountsCompany.findById(id).select(
    '_id companyName isDeleted'
  );
  if (!cpn) return null;
  cpn.isDeleted = !cpn.isDeleted;
  await cpn.save();
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
    {
      $lookup: {
        from: 'job',
        localField: '_id',
        foreignField: 'companyId',
        as: 'jobs',
      },
    },
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
    {
      $project: {
        jobs: 0,
        cvs: 0,
      },
    },
  ]);

  return companies;
};

export const getAllCompanies = async () => {
  return AccountsCompany.aggregate([
    { $match: { isDeleted: false } },
    {
      $lookup: {
        from: 'job',
        let: { companyId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$companyId', '$$companyId'] } } },
          { $match: { isDeleted: false } },
        ],
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
        _id: 1,
        companyName: 1,
        logo: 1,
        totalJob: 1,
        cityName: '$city.cityName',
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
};
