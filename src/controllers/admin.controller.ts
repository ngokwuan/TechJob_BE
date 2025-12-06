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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
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
export const getAllUsersForAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getAllUsersForAdmin();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng nào',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách người dùng thành công',
      data: { totalUser: user.length, user },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const toggleUserStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng',
      });
    const userAfterUpdate = await userService.updateStatusUser(id);

    return res.json({
      success: true,
      message: 'Cập nhật người dùng thành công',
      data: userAfterUpdate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
