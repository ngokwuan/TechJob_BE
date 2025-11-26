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
