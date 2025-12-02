import { CV } from '../models/cv.model';
import { Job } from '../models/job.model';

export const checkExistJob = async (jobId: string) => {
  const job = await Job.findById(jobId);
  if (!job || job.isDeleted) {
    return null;
  }

  return job;
};

export const createCV = async (data: any) => {
  const newCV = await CV.create({
    userId: data.userId,
    jobId: data.jobId,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    fileCV: data.fileCV,
  });

  return newCV;
};

export const findAndChangeViewedCV = async (cvId: string) => {
  const cv = await CV.findById(cvId).lean();
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
