import { AuthRequest } from '../types/auth.type';
import { Response } from 'express';
import { getUserById, updateUserById } from '../services/accountUser.service';
import { IAccountsUser } from '../models/accountUser.model';
import { uploadImage } from '../services/cloudinary.service';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Không xác thực người dùng',
      });
    }

    const user: IAccountsUser | null = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
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
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user?.id;
    const { fullName, email, phone, gender } = req.validated;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Không xác thực người dùng',
      });
    }

    const user: IAccountsUser | null = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Người dùng không tồn tại',
      });
    }

    let avatarUrl: string | undefined;

    if (req.file) {
      avatarUrl = await uploadImage(req.file, 'avatars');
    }
    const updatedUser = await updateUserById(id, {
      fullName,
      email,
      phone,
      gender,
      ...(avatarUrl && { avatar: avatarUrl }),
    });

    return res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin người dùng thành công',
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
