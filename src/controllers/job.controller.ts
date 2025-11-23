import { Request, Response } from 'express';
import {
  createJob,
  softDeleteByJobID,
  forceDeleteByJobID,
} from '../services/job.service';
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
export const softDeleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await softDeleteByJobID(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công việc',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Xóa mềm công việc thành công',
      data: { id },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server',
    });
  }
};
export const forceDeleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const job = await forceDeleteByJobID(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công việc',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Xóa vĩnh viễn công việc thành công',
      data: { id },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server',
    });
  }
};
