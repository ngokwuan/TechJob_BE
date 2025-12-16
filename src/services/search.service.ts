import mongoose from 'mongoose';
import { Job } from '../models/job.model';
import { AccountsCompany } from '../models/accountCompany.model';

export const searchService = async (keyword: string) => {
  const regex = new RegExp(keyword, 'i');

  const jobs = await Job.aggregate([
    {
      $match: {
        isDeleted: false,
        $or: [{ title: regex }, { technologies: regex }, { position: regex }],
      },
    },

    {
      $lookup: {
        from: 'accountCompany',
        localField: 'companyId',
        foreignField: '_id',
        as: 'company',
      },
    },

    { $unwind: '$company' },

    {
      $project: {
        jobId: '$_id',
        title: 1,
        salaryMin: 1,
        salaryMax: 1,
        position: 1,
        workingForm: 1,
        technologies: 1,
        createdAt: 1,
        companyName: '$company.companyName',
        logo: '$company.logo',
        _id: 0,
      },
    },

    { $sort: { createdAt: -1 } },
  ]);

  const companies = await AccountsCompany.aggregate([
    {
      $match: {
        isDeleted: false,
        $or: [{ companyName: regex }, { address: regex }],
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
      $addFields: {
        totalJobs: { $size: '$jobs' },
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

    { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },

    {
      $project: {
        companyName: 1,
        logo: 1,
        cityName: '$city.cityName',
        totalJobs: 1,
        _id: 1,
      },
    },

    { $sort: { totalJobs: -1 } },
  ]);

  return {
    jobs,
    companies,
  };
};

export const searchAndFilterJob = async (
  kw = '',
  position = '',
  cityId = ''
) => {
  const regexKw = new RegExp(kw, 'i');

  const pipeline: any[] = [
    {
      $match: {
        isDeleted: false,
        $or: [
          { title: { $regex: regexKw } },
          { technologies: { $elemMatch: { $regex: regexKw } } },
        ],
        ...(position && { position: position }),
      },
    },
    {
      $lookup: {
        from: 'accountCompany',
        localField: 'companyId',
        foreignField: '_id',
        as: 'company',
      },
    },
    { $unwind: '$company' },
  ];

  if (cityId) {
    pipeline.push({
      $match: { 'company.cityId': new mongoose.Types.ObjectId(cityId) },
    });
  }

  pipeline.push(
    { $sort: { createdAt: -1 } },
    {
      $project: {
        _id: 0,
        jobId: '$_id',
        title: 1,
        position: 1,
        salaryMin: 1,
        salaryMax: 1,
        workingForm: 1,
        technologies: 1,
        companyName: '$company.companyName',
        logo: '$company.logo',
        address: '$company.address',
        cityId: '$company.cityId',
      },
    }
  );

  return Job.aggregate(pipeline);
};
