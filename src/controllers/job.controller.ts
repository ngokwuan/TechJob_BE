import { Request, Response } from 'express';
import * as service from '../services/job.service';
import { AuthRequest } from '../types/auth.type';

export const createJobController = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.id;
    const imageFiles = req.files as Express.Multer.File[];

    const imageUrls = await service.uploadImagesToCloudinary(imageFiles);

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
      message: 'Xóa mềm công việc thành công',
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

    const job = await service.forceDeleteByJobID(id);

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
    const imageFiles = req.files as Express.Multer.File[];
    const imageUrls = await service.uploadImagesToCloudinary(imageFiles);

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
