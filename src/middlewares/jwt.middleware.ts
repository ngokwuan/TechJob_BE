import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest, JWTPayload } from '../types/auth.type';
import { isBlacklisted } from '../services/auth.service';
import { AccountsCompany } from '../models/accountCompany.model';
import { AccountsUser } from '../models/accountUser.model';

// Validate environment variables
if (!process.env.JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const createJWT = (payload: JWTPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error('Token expired:', error.message);
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.error('Invalid token:', error.message);
    } else {
      console.error('Token verification error:', error);
    }
    return null;
  }
};

export const checkUserJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token không tồn tại hoặc không hợp lệ',
      });
    }

    const blacklisted = await isBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({
        success: false,
        message: 'Token đã bị vô hiệu hóa',
      });
    }

    let decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn',
      });
    }

    const id = decoded.id;
    let data: any;

    if (decoded.role === 'company') {
      data = await AccountsCompany.findById(id)
        .select('companyName email role avatar')
        .lean();
      if (!data) {
        return res.status(401).json({
          success: false,
          message: 'Công ty không tồn tại',
        });
      }
    } else {
      data = await AccountsUser.findById(id)
        .select('fullName email role avatar')
        .lean();
      if (!data) {
        return res.status(401).json({
          success: false,
          message: 'Người dùng không tồn tại',
        });
      }
    }
    req.user = { id, ...data };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Xác thực thất bại',
    });
  }
};

export const checkRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Token không hợp lệ ',
        });
      }

      if (role !== req.user.role) {
        return res.status(403).json({
          success: false,
          message: 'Bạn không có quyền truy cập',
        });
      }

      next();
    } catch (error) {
      console.error('Role check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi kiểm tra quyền truy cập',
      });
    }
  };
};
