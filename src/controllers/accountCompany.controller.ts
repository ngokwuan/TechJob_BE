import { AuthRequest } from '../types/auth.type';
import { Response } from 'express';
import { getCompanyById } from '../services/accountCompany.service';
import { IAccountsCompany } from '../models/accountCompany.model';

export const getCompanyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Không xác thực người dùng',
      });
    }

    const company: IAccountsCompany | null = await getCompanyById(id);

    if (!company) {
      return res.status(404).json({
        message: 'Không tìm thấy người dùng',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lấy thông tin người dùng thành công',
      data: company,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
};
