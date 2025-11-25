import { Response } from 'express';
import { AuthRequest } from '../types/auth.type';
import { checkExistJob, createCV } from '../services/cv.service';

export const createCVController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const cvData = {
      ...req.validated,
      userId,
    };
    const job = await checkExistJob(cvData.jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Công việc không tồn tại',
      });
    }

    const cv = await createCV(cvData);

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
