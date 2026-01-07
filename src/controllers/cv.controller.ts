import { Response } from 'express';
import mongoose from 'mongoose';
import { AuthRequest } from '../types/auth.type';
import * as service from '../services/cv.service';
import {
  checkExistJob,
  getJobsByCompanyId,
  findSimilarJobs,
} from '../services/job.service';
import { UpdateStatusCVInput } from '../validateSchemas/cv.schema';
import { uploadCV } from '../services/cloudinary.service';
import { sendSuggestedJobsEmail } from '../services/mail.service';

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
    const similarJobs = await findSimilarJobs(job);

    await sendSuggestedJobsEmail(cvData.email, job.title, similarJobs);

    await service.updateCVAfterSentMail(cv._id as mongoose.Types.ObjectId);

    return res.status(201).json({
      success: true,
      message: 'Tạo CV thành công',
      data: cv,
    });
  } catch (error: any) {
    console.error('Create CV error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau ',
    });
  }
};
export const getDetailCVCPN = async (req: AuthRequest, res: Response) => {
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
    const cvId = req.params.cvId as string;
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
export const getListCVAndFilterStatusWithCPN = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const companyId = req.user?.id as string;
    const page = Number(req.query.page) || 1;
    const { status } = req.validated as { status?: string };
    const { data } = await getJobsByCompanyId(companyId);
    const jobIds = data.map((j: any) => j.jobId);

    const { dataCV, totalPageCV } = await service.getCVOfJob(
      jobIds,
      page,
      status
    );

    return res.json({
      success: true,
      message: 'Lấy danh sách CV thành công',

      totalCV: dataCV.length,
      dataCV,
      totalPageCV,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const getListCVWithUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = String(req.user?.id);
    const page = Number(req.query.page) || 1;

    const cvs = await service.getCVByUserId(userId, page);

    return res.json({
      success: true,
      message: 'Lấy danh sách CV thành công',
      data: cvs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
