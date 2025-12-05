import { Response } from 'express';
import { AccountsCompany } from '../models/accountCompany.model';
import { AuthRequest } from '../types/auth.type';
import { getAllCompaniesForAdmin } from '../services/accountCompany.service';
export const getListCPNForAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const company = await getAllCompaniesForAdmin();
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công ty nào',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách công ty thành công',
      data: company,
    });
  } catch (error) {}
};
export const toggleCompanyStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const company = await AccountsCompany.findById(id);
    if (!company)
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công ty',
      });

    company.isDeleted = !company.isDeleted;
    await company.save();

    return res.json({ success: true, message: 'Cập nhật thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
