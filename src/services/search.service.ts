import mongoose from 'mongoose';
import { Job } from '../models/job.model';
import { AccountsCompany } from '../models/accountCompany.model';

export const searchService = async (keyword: string, cityId?: string) => {
  const regex = new RegExp(keyword, 'i');
  const match: any = {
    isDeleted: false,
    $or: [{ title: regex }, { technologies: regex }, { position: regex }],
  };
  const pipeline: any[] = [
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
    match['company.cityId'] = new mongoose.Types.ObjectId(cityId);
  }
  pipeline.push(
    {
      $lookup: {
        from: 'city',
        localField: 'company.cityId',
        foreignField: '_id',
        as: 'city',
      },
    },
    { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },

    { $match: match },

    {
      $project: {
        _id: 0,
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
        cityId: '$company.cityId',
        cityName: '$city.cityName',
      },
    },

    { $sort: { createdAt: -1 } }
  );
  const jobs = await Job.aggregate(pipeline);
  const matchCPN: any = {
    isDeleted: false,
    $or: [{ companyName: regex }, { address: regex }],
  };
  if (cityId) {
    matchCPN.cityId = new mongoose.Types.ObjectId(cityId);
  }
  const companies = await AccountsCompany.aggregate([
    {
      $match: matchCPN,
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
export const searchAndFilterCPN = async (keyword: string, cityId?: string) => {
  const regex = new RegExp(keyword, 'i');
  const match: any = {
    isDeleted: false,
    $or: [{ companyName: regex }],
  };
  if (cityId) {
    match.cityId = new mongoose.Types.ObjectId(cityId);
  }
  const companies = await AccountsCompany.aggregate([
    {
      $match: match,
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
  return companies;
};
