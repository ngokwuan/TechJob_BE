import { CV } from '../models/cv.model';
import mongoose from 'mongoose';
export const createCV = async (data: any) => {
  const newCV = await CV.create({
    userId: new mongoose.Types.ObjectId(data.userId),
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

export const getCVOfJob = async (jobIds: string[]) => {
  return CV.find({
    jobId: { $in: jobIds },
  }).populate('jobId', 'title');
};
export const getCVByUserId = async (userId: string) => {
  return await CV.find({ userId }).select(
    'jobId fullName email createdAt fileCV status'
  );
};
