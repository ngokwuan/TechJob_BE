import { CV } from '../models/cv.model';
import mongoose from 'mongoose';
export const createCV = async (data: any) => {
  const newCV = await CV.create({
    userId: new mongoose.Types.ObjectId(data.userId),
    jobId: new mongoose.Types.ObjectId(data.jobId),
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    fileCV: data.fileCV,
  });

  return newCV;
};
export const checkExistCV = async (id: string) => {
  return await CV.findById(id);
};
export const findAndChangeViewedCV = async (cvId: string) => {
  const cv = await CV.findById(cvId).populate('jobId', 'title');
  if (!cv?.viewed) {
    await CV.findByIdAndUpdate(cvId, { viewed: true });
  }
  return cv;
};
export const findCV = async (cvId: string) => {
  const cv = await CV.findById(cvId).lean();
  return cv;
};
export const updateStatus = async (cvId: string, status: string) => {
  return await CV.findByIdAndUpdate(cvId, { status }, { new: true }).lean();
};
export const updateCV = async (cvId: string, updateData: any) => {
  const cv = await CV.findById(cvId);
  if (!cv) return null;
  const allowedFields = ['fullName', 'email', 'phone', 'fileCV'];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      (cv as any)[field] = updateData[field];
    }
  });

  const updatedJob = await cv.save();
  return updatedJob;
};

export const deleteByCVId = async (id: string) => {
  try {
    await CV.findByIdAndDelete(id);
    return id;
  } catch (error) {
    throw error;
  }
};

export const getCVOfJob = async (
  jobIds: mongoose.Types.ObjectId[],
  page = 1,
  status?: string
) => {
  const LIMIT = 10;
  const skip = (page - 1) * LIMIT;

  const filter: any = {
    jobId: { $in: jobIds },
  };
  if (status) filter.status = status;

  const [dataCV, totalPageCV] = await Promise.all([
    CV.find(filter).populate('jobId', 'title').skip(skip).limit(LIMIT),
    CV.countDocuments(filter),
  ]);

  return {
    totalPageCV: Math.ceil(totalPageCV / LIMIT),
    dataCV,
  };
};

export const getCVByUserId = async (userId: string, page = 1) => {
  const LIMIT = 10;
  const skip = (page - 1) * LIMIT;

  const basePipeline = [
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },

    {
      $lookup: {
        from: 'job',
        localField: 'jobId',
        foreignField: '_id',
        as: 'job',
      },
    },
    { $unwind: { path: '$job', preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: 'accountCompany',
        localField: 'job.companyId',
        foreignField: '_id',
        as: 'company',
      },
    },
    { $unwind: { path: '$company', preserveNullAndEmptyArrays: true } },

    {
      $project: {
        fullName: 1,
        email: 1,
        fileCV: 1,
        status: 1,
        createdAt: 1,

        jobTitle: '$job.title',
        position: '$job.position',
        salaryMin: '$job.salaryMin',
        salaryMax: '$job.salaryMax',
        workingForm: '$job.workingForm',

        companyName: '$company.companyName',
      },
    },
  ];

  const [data, total] = await Promise.all([
    CV.aggregate([...basePipeline, { $skip: skip }, { $limit: LIMIT }]),
    CV.aggregate([...basePipeline, { $count: 'count' }]),
  ]);

  return {
    totalPage: Math.ceil((total[0]?.count || 0) / LIMIT),
    data,
  };
};
export const getAllCVForAdmin = async () => {
  return CV.find().select('_id');
};
export const getCVStatusByCompanyId = async (companyId: string) => {
  const result = await CV.aggregate([
    {
      $lookup: {
        from: 'job',
        localField: 'jobId',
        foreignField: '_id',
        as: 'job',
      },
    },
    { $unwind: '$job' },

    {
      $match: {
        'job.companyId': new mongoose.Types.ObjectId(companyId),
      },
    },

    {
      $group: {
        _id: '$status',
        total: { $sum: 1 },
      },
    },
  ]);

  return {
    totalPendingCVs: result.find((r) => r._id === 'Pending')?.total || 0,
    totalRejectedCVs: result.find((r) => r._id === 'Rejected')?.total || 0,
    totalAcceptedCVs: result.find((r) => r._id === 'Accepted')?.total || 0,
  };
};
export const getCVStatusByUserId = async (userId: string) => {
  const result = await CV.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: '$status',
        total: { $sum: 1 },
      },
    },
  ]);

  return {
    totalPendingCVs: result.find((r) => r._id === 'Pending')?.total || 0,
    totalRejectedCVs: result.find((r) => r._id === 'Rejected')?.total || 0,
    totalAcceptedCVs: result.find((r) => r._id === 'Accepted')?.total || 0,
  };
};
