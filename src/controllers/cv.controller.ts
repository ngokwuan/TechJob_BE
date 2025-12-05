import { Response } from 'express';
import { AuthRequest } from '../types/auth.type';
import * as service from '../services/cv.service';
import { checkExistJob, getJobsByCompanyId } from '../services/job.service';
import { UpdateStatusCVInput } from '../validateSchemas/cv.schema';
import { uploadCV } from '../services/cloudinary.service';

export const createCVController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Bạn phải tải lên file CV (PDF)',
      });
    }

    const fileCVUrl = await uploadCV(file);

    const cvData = {
      ...req.validated,
      userId,
      fileCV: fileCVUrl,
    };

    const job = await checkExistJob(cvData.jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Công việc không tồn tại',
      });
    }

    const cv = await service.createCV(cvData);

    return res.status(201).json({
      success: true,
      message: 'Tạo CV thành công',
      data: cv,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau ',
    });
  }
};
export const getDetailCV = async (req: AuthRequest, res: Response) => {
  try {
    const cvId = req.params.cvId;

    const cv = await service.findAndChangeViewedCV(cvId);
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV không tồn tại',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lấy chi tiết CV thành công',
      data: cv,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau ',
    });
  }
};
export const getDetailCVUser = async (req: AuthRequest, res: Response) => {
  try {
    const cvId = req.query.cvId as string;
    const cv = await service.findCV(cvId);
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV không tồn tại',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lấy chi tiết CV thành công',
      data: cv,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau ',
    });
  }
};
export const updateStatusCV = async (req: AuthRequest, res: Response) => {
  try {
    const cvId = req.params.cvId;
    const { status } = req.validated as UpdateStatusCVInput;
    const cv = await service.updateStatus(cvId, status);
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'CV không tồn tại ',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Cập nhật status CV thành công',
      data: cv,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau ',
    });
  }
};
export const updateCV = async (req: AuthRequest, res: Response) => {
  try {
    const { cvId } = req.params;
    const updateData = req.validated;
    const existCV = await service.checkExistCV(cvId);
    if (!existCV) {
      return res.status(404).json({
        success: false,
        message: 'CV không tồn tại ',
      });
    }
    if (req.file) {
      const file = req.file;
      const fileCVUrl = await uploadCV(file);
      if (fileCVUrl.length > 0) {
        updateData.fileCV = fileCVUrl;
      }
    }

    const updatedCV = await service.updateCV(cvId, updateData);

    return res.status(200).json({
      success: true,
      message: 'Cập nhật CV thành công',
      data: updatedCV,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const deleteCV = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const cv = await service.checkExistCV(id);
    console.log(cv);
    if (!cv) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy CV',
      });
    }
    await service.deleteByCVId(id);

    return res.status(200).json({
      success: true,
      message: 'Xóa vĩnh viễn CV thành công',
      data: { id },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const getListCVWithCPN = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = String(req.user?.id);

    const jobs = await getJobsByCompanyId(companyId);

    if (!jobs.length) {
      return res.json({
        success: true,
        message: 'Không có job nào',
        data: { totalCV: 0, cvs: [] },
      });
    }

    const jobIds = jobs.map((j: any) => String(j.jobId));

    const cvs = await service.getCVOfJob(jobIds);

    return res.json({
      success: true,
      message: 'Lấy danh sách CV thành công',
      data: {
        totalCV: cvs.length,
        cvs,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
