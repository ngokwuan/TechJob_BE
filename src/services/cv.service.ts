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
  status?: string
) => {
  const filter: any = {
    jobId: { $in: jobIds },
  };
  if (status) filter.status = status;

  return CV.find(filter).populate('jobId', 'title');
};

export const getCVByUserId = async (userId: string) => {
  const cvList = await CV.aggregate([
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
  ]);

  return cvList;
};
export const getAllCVForAdmin = async () => {
  return CV.find().select('_id');
};
