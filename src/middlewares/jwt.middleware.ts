import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest, JWTPayload } from '../types/auth.type';
import { isBlacklisted } from '../services/auth.service';

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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token không tồn tại hoặc không hợp lệ',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token không tồn tại',
      });
    }

    // Check if token is blacklisted
    const blacklisted = await isBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({
        success: false,
        message: 'Token đã bị vô hiệu hóa',
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn',
      });
    }
    // req.user = {
    //   id: String(decoded.id),
    //   role: decoded.role,
    //   iat: decoded.iat,
    //   exp: decoded.exp,
    // };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Xác thực thất bại',
    });
  }
};

export const checkRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Chưa xác thực',
        });
      }

      if (!roles.includes(req.user.role)) {
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
