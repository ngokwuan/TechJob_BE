import { Request, Response } from 'express';
import * as service from '../services/city.service';

export const getAllCity = async (req: Request, res: Response) => {
  try {
    const cities = await service.getAllCities();
    if (!cities)
      return res.status(404).json({
        success: false,
        message: 'Không tồn tại thành phố nào',
      });
    return res.status(200).json({
      success: true,
      message: 'Lấy thông tin thành phố thành công',
      data: cities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};

export const getCityById = async (req: Request, res: Response) => {
  try {
    const city = await service.getCityById(req.params.id);
    if (!city) {
      return res
        .status(404)
        .json({ success: false, message: 'Không tìm thấy thành phố' });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: 'Lấy thông tin thành phố thành công',
        data: city,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
