import {
  AccountsCompany,
  IAccountsCompany,
} from '../models/accountCompany.model';
import * as jobService from '../services/job.service';
import * as cvService from '../services/cv.service';
import { PipelineStage } from 'mongoose';
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
    'companyName address cityId companyEmployees companyModel description images phone workOverTime workingTime logo'
  );
};
export const updateCompanyById = async (
  id: string,
  data: Partial<IAccountsCompany>
): Promise<IAccountsCompany | null> => {
  return AccountsCompany.findByIdAndUpdate(id, data, {
    new: true,
  }).select(
    'companyName address cityId companyEmployees companyModel description images phone workOverTime workingTime logo'
  );
};

export const getAllCompaniesForAdmin = async (page = 1) => {
  const LIMIT = 10;
  const skip = (page - 1) * LIMIT;

  const basePipeline: PipelineStage[] = [
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
  ];

  const [data, total] = await Promise.all([
    AccountsCompany.aggregate([
      ...basePipeline,
      { $skip: skip },
      { $limit: LIMIT },
    ]),
    AccountsCompany.aggregate([...basePipeline, { $count: 'count' }]),
  ]);

  return {
    totalPage: Math.ceil((total[0]?.count || 0) / LIMIT),
    data,
  };
};

export const getAllCompanies = async (page = 1) => {
  const LIMIT = 12;
  const skip = (page - 1) * LIMIT;

  const basePipeline: PipelineStage[] = [
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
  ];

  const [data, total] = await Promise.all([
    AccountsCompany.aggregate([
      ...basePipeline,
      { $skip: skip },
      { $limit: LIMIT },
    ]),
    AccountsCompany.aggregate([...basePipeline, { $count: 'count' }]),
  ]);

  return {
    totalPage: Math.ceil((total[0]?.count || 0) / LIMIT),
    data,
  };
};

export const getDashboard = async (id: string) => {
  const { data } = await jobService.getJobsByCompanyId(id);
  const activeJobs = await jobService.countActiveJobsByCompany(id);
  const cvsByStatus = await cvService.getCVStatusByCompanyId(id);
  const totalJobs = data.length;
  const totalActiveJobs = activeJobs;
  const totalLockJobs = totalJobs - totalActiveJobs;

  return {
    totalJobs,
    totalActiveJobs,
    totalLockJobs,
    ...cvsByStatus,
  };
};

export const getAllCompaniesForDashboardAdmin = async () => {
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
