import { Request, Response } from 'express';
import * as service from '../services/job.service';
import { AuthRequest } from '../types/auth.type';
import { uploadImages } from '../services/cloudinary.service';
export const createJobController = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.id;

    const imageUrls = await uploadImages(
      req.files as Express.Multer.File[],
      'jobs'
    );
    const job = await service.createJob({
      ...req.validated,
      companyId,
      images: imageUrls,
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo công việc thành công',
      data: job,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const softDeleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await service.softDeleteByJobID(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công việc',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Đã đóng tin tuyển dụng',
      data: { id },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const forceDeleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const job = service.checkExistJob(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công việc',
      });
    }
    await service.forceDeleteByJobID(id);

    return res.status(200).json({
      success: true,
      message: 'Xóa vĩnh viễn công việc thành công',
      data: { id },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const updateJobController = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = String(req.user?.id);
    const { jobId } = req.params;
    const updateData = req.validated;
    // Lấy file upload (nếu có)
    const imageUrls = await uploadImages(
      req.files as Express.Multer.File[],
      'jobs'
    );

    // Nếu có ảnh mới, cập nhật vào updateData
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const updatedJob = await service.updateJobById(
      jobId,
      companyId,
      updateData
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: 'Công việc không tồn tại ',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cập nhật công việc thành công',
      data: updatedJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const getListJobWithoutRole = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const jobs = await service.getJobsWithoutRole();

    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách công việc thành công',
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const getListJobWithRole = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.id;
    if (!companyId) {
      return res.status(401).json({
        success: false,
        message: 'Không xác thực công ty',
      });
    }
    const jobs = await service.getJobsByCompanyId(companyId);
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: 'Không tồn tài công việc nào',
      });
    }
    const totalJob = jobs.length;
    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách công việc thành công',
      data: { totalJob, jobs },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const getDetailJob = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(401).json({
        success: false,
        message: 'Không xác thực công việc',
      });
    }

    const job = await service.getDetailJob(jobId);
    const relateJobs = await service.getRelateJobs(jobId);
    return res.status(200).json({
      success: true,
      message: 'Lấy  công việc thành công',
      data: { job, relateJobs },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
