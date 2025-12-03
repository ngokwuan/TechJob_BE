import { CV } from '../models/cv.model';

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
export const checkExistCV = async (id: string) => {
  return await CV.findById(id);
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

export const deleteByCVId = async (id: string) => {
  try {
    await CV.findByIdAndDelete(id);
    return id;
  } catch (error) {
    throw error;
  }
};
