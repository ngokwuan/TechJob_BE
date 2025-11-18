import { Response } from 'express';
import { AuthRequest } from '../types/auth.type';
import {
  loginAccount,
  registerAccount,
  removeToken,
} from '../services/auth.service';
import { createJWT } from '../middlewares/jwt.middleware';
import { IAccountsUser } from '../models/accountUser.model';
import { IAccountsCompany } from '../models/accountCompany.model';

export const userLogin = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.validated;

    const user = (await loginAccount(
      email,
      password,
      'user'
    )) as IAccountsUser | null;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }
    const payload = {
      id: user._id.toString(),
      role: user.role,
    };
    const token = createJWT(payload);

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        accessToken: token,
        user: payload,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const userRegister = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.validated;

    const user = (await registerAccount(data, 'user')) as IAccountsUser | null;

    if (!user) {
      return res.status(409).json({
        success: false,
        message: 'Email đã tồn tại',
      });
    }
    const payload = {
      id: user._id.toString(),
      role: user.role,
    };
    const token = createJWT(payload);

    return res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        accessToken: token,
        user: payload,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const companyLogin = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.validated;

    const company = (await loginAccount(
      email,
      password,
      'company'
    )) as IAccountsCompany | null;

    if (!company) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }
    const payload = {
      id: company._id.toString(),
      role: company.role,
    };
    const token = createJWT(payload);

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        accessToken: token,
        company: payload,
      },
    });
  } catch (error) {
    console.error('Company login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const companyRegister = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.validated;

    const company = (await registerAccount(
      data,
      'company'
    )) as IAccountsCompany | null;

    if (!company) {
      return res.status(409).json({
        success: false,
        message: 'Email đã tồn tại',
      });
    }
    const payload = {
      id: company._id.toString(),
      role: company.role,
    };
    const token = createJWT(payload);

    return res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        accessToken: token,
        company: payload,
      },
    });
  } catch (error) {
    console.error('Company register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token không tồn tại hoặc không hợp lệ',
      });
    }

    const token = authHeader.split(' ')[1];

    // Thêm token vào blacklist
    await removeToken(token);

    return res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
