import { Job } from '../models/job.model';
import { AccountsCompany } from '../models/accountCompany.model';

export const searchService = async (keyword: string) => {
  const regex = new RegExp(keyword, 'i');

  // ----- SEARCH JOBS -----
  const jobs = await Job.find({
    isDeleted: false,
    $or: [{ title: regex }, { technologies: regex }, { position: regex }],
  })
    .populate('companyId', 'companyName logo address')
    .sort({ createdAt: -1 })
    .lean();

  const formattedJobs = jobs.map((job) => ({
    jobId: job._id,
    title: job.title,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    position: job.position,
    workingForm: job.workingForm,
    technologies: job.technologies,
    description: job.description,
    images: job.images,
  }));

  // ----- SEARCH COMPANIES -----
  const companies = await AccountsCompany.find({
    isDeleted: false,
    $or: [{ companyName: regex }, { address: regex }],
  })
    .select(
      'companyName email address cityId companyEmployees companyModel description phone workOverTime workingTime logo'
    )
    .populate('cityId', 'cityName')
    .sort({ createdAt: -1 })
    .lean();

  const formattedCompanies = companies.map((c) => ({
    companyId: c._id,
    companyName: c.companyName,
    email: c.email,
    address: c.address,
    cityID: c.cityId?._id,
    companyEmployees: c.companyEmployees,
    companyModel: c.companyModel,
    description: c.description,
    phone: c.phone,
    workOverTime: c.workOverTime,
    workingTime: c.workingTime,
    logo: c.logo,
  }));

  return {
    jobs: formattedJobs,
    companies: formattedCompanies,
  };
};
