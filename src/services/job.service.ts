import mongoose from 'mongoose';
import { PipelineStage, Types } from 'mongoose';

import { Job } from '../models/job.model';
import { AccountsCompany } from '../models/accountCompany.model';
export const checkExistJob = async (jobId: string) => {
  const job = await Job.findById(jobId);
  if (!job || job.isDeleted) {
    return null;
  }

  return job;
};
export const createJob = async (data: any) => {
  const { companyId } = data;

  const company = await AccountsCompany.findById(companyId);
  if (!company) {
    throw {
      status: 400,
      message: 'Company does not exist',
    };
  }

  const newJob = await Job.create({
    companyId: new mongoose.Types.ObjectId(companyId),
    title: data.title,
    salaryMin: data.salaryMin,
    salaryMax: data.salaryMax,
    position: data.position,
    workingForm: data.workingForm,
    technologies: data.technologies,
    description: data.description,
    images: data.images || [],
  });

  return newJob;
};
export const softDeleteByJobID = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const existJob = await Job.findById(id).select('_id isDeleted');
    if (!existJob) return null;
    existJob.isDeleted = !existJob.isDeleted;
    await existJob.save();
    return existJob;
  } catch (error) {
    throw error;
  }
};
export const forceDeleteByJobID = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) return null;

    return id;
  } catch (error) {
    throw error;
  }
};
export const updateJobById = async (
  jobId: string,
  companyId: string,
  updateData: any
) => {
  const job = await Job.findById(jobId);
  if (!job) return null;

  const allowedFields = [
    'title',
    'salaryMin',
    'salaryMax',
    'position',
    'workingForm',
    'technologies',
    'description',
    'images',
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      (job as any)[field] = updateData[field];
    }
  });

  const updatedJob = await job.save();
  return updatedJob;
};
export const getJobsWithoutRole = async (page = 1) => {
  const LIMIT = 12;
  const skip = (page - 1) * LIMIT;

  const basePipeline: PipelineStage[] = [
    {
      $match: { isDeleted: false },
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
  ];

  const [data, total] = await Promise.all([
    Job.aggregate([...basePipeline, { $skip: skip }, { $limit: LIMIT }]),
    Job.aggregate([...basePipeline, { $count: 'count' }]),
  ]);

  return {
    totalPage: Math.ceil((total[0]?.count || 0) / LIMIT),
    data,
  };
};
export const getJobsByCompanyIdWithoutFilter = async (companyId: string) => {
  const basePipeline: PipelineStage[] = [
    {
      $match: {
        isDeleted: false,
        companyId: new Types.ObjectId(companyId),
      },
    },

    // Join company
    {
      $lookup: {
        from: 'accountCompany',
        localField: 'companyId',
        foreignField: '_id',
        as: 'company',
      },
    },
    {
      $unwind: '$company',
    },

    // Join city
    {
      $lookup: {
        from: 'city',
        localField: 'company.cityId',
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

    // Join CV
    {
      $lookup: {
        from: 'cv',
        localField: '_id',
        foreignField: 'jobId',
        as: 'cvList',
      },
    },

    {
      $addFields: {
        totalApplicants: { $size: '$cvList' },
        cityName: '$city.cityName',
      },
    },

    {
      $project: {
        jobId: '$_id',
        title: 1,

        workingForm: 1,
        createdAt: 1,
        totalApplicants: 1,
        position: 1,
        cityName: 1,
        _id: 0,
      },
    },

    { $sort: { createdAt: -1 } },
  ];

  const data = await Job.aggregate(basePipeline);

  return data;
};
export const getJobsByCompanyId = async (
  companyId: string,
  page = 1,
  position?: string,
  isDeleted?: boolean
) => {
  const LIMIT = 5;
  const skip = (page - 1) * LIMIT;

  const match: any = {
    companyId: new mongoose.Types.ObjectId(companyId),
  };
  if (position) match.position = position;
  if (typeof isDeleted === 'boolean') {
    match.isDeleted = isDeleted;
  }
  const basePipeline: PipelineStage[] = [
    {
      $match: match,
    },

    // Join company
    {
      $lookup: {
        from: 'accountCompany',
        localField: 'companyId',
        foreignField: '_id',
        as: 'company',
      },
    },
    {
      $unwind: '$company',
    },

    // Join city
    {
      $lookup: {
        from: 'city',
        localField: 'company.cityId',
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

    // Join CV
    {
      $lookup: {
        from: 'cv',
        localField: '_id',
        foreignField: 'jobId',
        as: 'cvList',
      },
    },

    {
      $addFields: {
        totalApplicants: { $size: '$cvList' },
        cityName: '$city.cityName',
      },
    },

    {
      $project: {
        jobId: '$_id',
        title: 1,
        isDeleted: 1,
        workingForm: 1,
        createdAt: 1,
        totalApplicants: 1,
        position: 1,
        cityName: 1,
        _id: 0,
      },
    },

    { $sort: { createdAt: -1 } },
  ];

  const [data, total] = await Promise.all([
    Job.aggregate([...basePipeline, { $skip: skip }, { $limit: LIMIT }]),
    Job.aggregate([...basePipeline, { $count: 'count' }]),
  ]);

  return {
    totalPage: Math.ceil((total[0]?.count || 0) / LIMIT),
    data,
  };
};
export const getAllJobsForAdmin = async () => {
  const jobs = await Job.find();
  return jobs;
};

export const getDetailJob = async (jobId: string) => {
  const job = await Job.findById(jobId)
    .populate({
      path: 'companyId',
      select:
        'companyName logo companyModel companyEmployees workingTime cityId',
      populate: {
        path: 'cityId',
        select: 'cityName',
      },
    })
    .lean();

  if (!job) return null;

  const company = job.companyId as any;

  return {
    jobId: job._id.toString(),
    title: job.title,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    position: job.position,
    workingForm: job.workingForm,
    technologies: job.technologies,
    description: job.description,
    images: job.images,
    createdAt: job.createdAt,

    // Company info
    companyId: company._id,
    companyName: company?.companyName,
    logo: company?.logo,
    companyModel: company?.companyModel,
    companyEmployees: company?.companyEmployees,
    workingTime: company?.workingTime,

    //  City
    cityName: company?.cityId?.cityName || null,
  };
};

export const getRelateJobs = async (jobId: string) => {
  const job = await Job.findById(jobId).select('companyId');
  if (!job) return [];

  const companyId = job.companyId;

  return await Job.aggregate([
    {
      $match: {
        companyId: companyId,
        isDeleted: false,
        _id: { $ne: new mongoose.Types.ObjectId(jobId) },
      },
    },

    {
      $lookup: {
        from: 'cv',
        localField: '_id',
        foreignField: 'jobId',
        as: 'cvList',
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
      $lookup: {
        from: 'city',
        localField: 'company.cityId',
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
      $addFields: {
        totalApplicants: { $size: '$cvList' },
        cityName: '$city.cityName',
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        jobId: '$_id',
        title: 1,
        position: 1,
        workingForm: 1,
        createdAt: 1,
        images: 1,
        cityName: 1,
        totalApplicants: 1,
        _id: 0,
      },
    },
  ]);
};

export const countActiveJobsByCompany = async (companyId: string) => {
  return Job.countDocuments({
    companyId: new mongoose.Types.ObjectId(companyId),
    isDeleted: false,
  });
};
export const findSimilarJobs = async (job: any, limit = 5) => {
  return await Job.find({
    _id: { $ne: job._id },
    isDeleted: false,
    $or: [
      { position: job.position },
      { technologies: { $in: job.technologies || [] } },
    ],
  })
    .select('title position workingForm salaryMin salaryMax')
    .limit(limit)
    .lean();
};
