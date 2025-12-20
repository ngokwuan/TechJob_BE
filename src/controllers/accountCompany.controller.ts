import { AuthRequest } from '../types/auth.type';
import { Response } from 'express';
import * as service from '../services/accountCompany.service';
import { IAccountsCompany } from '../models/accountCompany.model';
import { uploadImage, uploadImages } from '../services/cloudinary.service';

import { getJobsByCompanyId } from '../services/job.service';

export const getDetailCompanyForGuest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.companyId;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Không xác thực công ty',
      });
    }

    const company: IAccountsCompany | null = await service.getCompanyById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công ty',
      });
    }
    const { data } = await getJobsByCompanyId(id);
    const totalJobs = data.length;
    return res.status(200).json({
      success: true,
      message: 'Lấy thông tin công ty thành công',
      totalJobs,
      company,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const getCompanyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Không xác thực công ty',
      });
    }

    const company: IAccountsCompany | null = await service.getCompanyById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công ty',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lấy thông tin công ty thành công',
      data: company,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const updateCompanyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.user?.id);
    const updateData = req.validated;

    const files = req.files as {
      logo?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    if (files?.images?.length) {
      const imageUrls = await uploadImages(files.images, 'company-images');
      updateData.images = imageUrls;
    }

    if (files?.logo?.length) {
      const logoUrl = await uploadImage(files.logo[0], 'company-logo');
      updateData.logo = logoUrl;
    }

    const updatedCompany = await service.updateCompanyById(id, updateData);

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: 'Công ty không tồn tại',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin công ty thành công',
      data: updatedCompany,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const getListCPN = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const jobs = await service.getAllCompanies(page);

    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách công ty thành công',
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
export const getDashBoard = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.id as string;
    const result = await service.getDashboard(id);
    return res.status(200).json({
      success: true,
      message: 'Lấy thông tin  thành công',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
