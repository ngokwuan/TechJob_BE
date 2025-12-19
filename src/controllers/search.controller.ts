import { Response } from 'express';
import { AuthRequest } from '../types/auth.type';

import { SearchQueryInput } from '../validateSchemas/search.schema';
import * as service from '../services/search.service';

export const searchAndFilterCityId = async (req: any, res: Response) => {
  try {
    const { keyword, cityId } = req.validated as SearchQueryInput;
    const kw = keyword?.trim() || '';

    const result = await service.searchService(kw, cityId);

    return res.status(200).json({
      success: true,
      message: 'Tra cứu thành công',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const searchAndFilterJobForGuest = async (req: any, res: Response) => {
  try {
    const { keyword = '', position = '', cityId = '' } = req.validated;
    const kw = keyword?.trim() || '';

    const result = await service.searchAndFilterJob(kw, position, cityId);

    return res.status(200).json({
      success: true,
      message: 'Tra cứu thành công',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
export const searchAndFilterCPNForGuest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { keyword, cityId } = req.validated;
    const kw = keyword?.trim() || '';
    const result = await service.searchAndFilterCPN(kw, cityId);

    return res.status(200).json({
      success: true,
      message: 'Tra cứu thành công',
      data: { totalCompany: result.length, result },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau',
    });
  }
};
