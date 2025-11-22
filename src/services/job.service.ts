import mongoose from 'mongoose';
import { Job } from '../models/job.model';
import { AccountsCompany } from '../models/accountCompany.model';

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
    companyId: companyId,
    title: data.title,
    salaryMin: data.salaryMin,
    salaryMax: data.salaryMax,
    position: data.position,
    workingForm: data.workingForm,
    technologies: data.technologies,
    description: data.description,
    images: data.images || null,
  });

  return newJob;
};
export const softDeleteByJobID = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const existJob = await Job.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!existJob) return null;
    return existJob.id;
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
