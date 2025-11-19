import { AuthRequest } from '../types/auth.type';
import { Response } from 'express';
import { getUserById } from '../services/accountUser.service';
import { IAccountsUser } from '../models/accountUser.model';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        message: 'Không xác thực người dùng',
      });
    }

    const user: IAccountsUser | null = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'Không tìm thấy người dùng',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lấy thông tin người dùng thành công',
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
};
