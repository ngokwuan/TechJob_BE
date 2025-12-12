import mongoose from 'mongoose';
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
export const getJobsWithoutRole = async () => {
  const jobs = await Job.aggregate([
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
  ]);

  return jobs;
};
export const getJobsByCompanyId = async (companyId: string) => {
  const jobs = await Job.aggregate([
    {
      $match: {
        companyId: new mongoose.Types.ObjectId(companyId),
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
      $addFields: {
        totalApplicants: { $size: '$cvList' },
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
        _id: 0, // không trả về _id vì đã map thành jobId
      },
    },

    { $sort: { createdAt: -1 } },
  ]);
  return jobs;
};
export const getAllJobsForAdmin = async () => {
  const jobs = await Job.find();
  return jobs;
};
export const getDetailJob = async (jobId: string) => {
  return await Job.findById(jobId).populate({
    path: 'companyId',
    select: 'companyName logo companyModel companyEmployees workingTime cityId',
    populate: {
      path: 'cityId',
      select: 'cityName',
    },
  });
};

export const getRelateJobs = async (jobId: string) => {
  const job = await Job.findById(jobId).select('companyId');
  if (!job) return [];

  const relateJobs = await Job.find({
    companyId: job.companyId,
    _id: { $ne: jobId },
    isDeleted: false,
  })
    .select('title position workingForm createdAt images')
    .populate({
      path: 'companyId',
      select: 'cityId',
      populate: {
        path: 'cityId',
        select: 'cityName',
      },
    })
    .sort({ createdAt: -1 });

  return relateJobs;
};
