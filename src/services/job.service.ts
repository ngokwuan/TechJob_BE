// services/job.service.ts
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
