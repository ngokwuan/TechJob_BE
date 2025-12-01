import mongoose from 'mongoose';
import { Job } from '../models/job.model';
import { AccountsCompany } from '../models/accountCompany.model';
import cloudinary from '../config/cloudinary';

// export const uploadImagesToCloudinary = async (
//   files: Express.Multer.File[],
//   folder = 'jobs'
// ): Promise<string[]> => {
//   const imageUrls: string[] = [];

//   if (!files || files.length === 0) return imageUrls;

//   for (const file of files) {
//     const result: any = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         {
//           folder,
//           resource_type: 'image',
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       stream.end(file.buffer);
//     });

//     imageUrls.push(result.secure_url);
//   }

//   return imageUrls;
// };
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
    companyId,
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
