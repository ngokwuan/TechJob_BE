import { Response } from 'express';
import { AuthRequest } from '../types/auth.type';
import * as service from '../services/cv.service';

export const createCVController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const cvData = {
      ...req.validated,
      userId,
    };
    const job = await service.checkExistJob(cvData.jobId);
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
