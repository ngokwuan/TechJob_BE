import { Response } from 'express';
import { AuthRequest } from '../types/auth.type';
import * as companyService from '../services/accountCompany.service';
import * as userService from '../services/accountUser.service';
import * as jobService from '../services/job.service';
import * as cvService from '../services/cv.service';
export const getListCPNForAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const { data, totalPage, totalCompany } =
      await companyService.getAllCompaniesForAdmin(page);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy công ty nào',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách công ty thành công',
      totalCompany,
      data,
      totalPage,
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
    const page = Number(req.query.page) || 1;

    const { data, totalPage, totalUser } =
      await userService.getAllUsersForAdmin(page);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng nào',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách người dùng thành công',
      totalUser,
      data,
      totalPage,
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
export const getDashBoard = async (req: AuthRequest, res: Response) => {
  const cpns = await companyService.getAllCompaniesForDashboardAdmin();
  const users = await userService.getAllUsersForDashboardAdmin();
  const lockUsers = await userService.getAllLockUser();
  const jobs = await jobService.getAllJobsForAdmin();
  const cvs = await cvService.getAllCVForAdmin();
  if (!cpns || !users || !lockUsers || !jobs || !cvs) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy thông tin cung cấp',
    });
  }
  return res.status(200).json({
    success: true,
    message: 'Lấy thông tin thành công',
    data: {
      totalCompanies: cpns.length,
      totalUsers: users.length,
      totalLockUsers: lockUsers.length,
      totalJobs: jobs.length,
      totalCVs: cvs.length,
    },
  });
};
