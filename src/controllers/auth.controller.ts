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

export const checkAccount = async (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Lấy thông tin thành công',
    data: req.user,
  });
};
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
      fullName: user.fullName,
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

    return res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        user: {
          id: user._id.toString(),
          role: user.role,
          fullName: user.fullName,
        },
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
      companyName: company.companyName,
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

    return res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        company: {
          id: company._id.toString(),
          role: company.role,
          companyName: company.companyName,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const token = req.cookies?.token;

    if (token) {
      await removeToken(token);
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

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
