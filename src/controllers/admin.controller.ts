import { Response } from 'express';
import { AuthRequest } from '../types/auth.type';
import * as companyService from '../services/accountCompany.service';
import * as userService from '../services/accountUser.service';
export const getListCPNForAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const company = await companyService.getAllCompaniesForAdmin();
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công ty nào',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách công ty thành công',
      data: { totalCompany: company.length, company },
    });
  } catch (error) {}
};
export const toggleCompanyStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const company = await companyService.checkExistCPN(id);
    if (!company)
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công ty',
      });
    const companyAfterUpdate = await companyService.updateStatusCPN(id);

    return res.json({
      success: true,
      message: 'Cập nhật thành công công ty',
      data: companyAfterUpdate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
