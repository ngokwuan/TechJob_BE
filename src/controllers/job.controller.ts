import { Request, Response } from 'express';
import { createJob } from '../services/job.service';
import { AuthRequest } from '../types/auth.type';

export const createJobController = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.id;
    const jobData = {
      ...req.validated,
      companyId,
    };
    const job = await createJob(jobData);

    return res.status(201).json({
      status: 201,
      message: 'Create Job Successful',
      data: {
        jobId: job._id,
        companyId: job.companyId,
        title: job.title,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        position: job.position,
        workingForm: job.workingForm,
        technologies: job.technologies,
        description: job.description,
        images: job.images,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
