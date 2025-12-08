import { Response } from 'express';
import { SearchQueryInput } from '../validateSchemas/search.schema';
import * as searchService from '../services/search.service';

export const searchController = async (req: any, res: Response) => {
  try {
    const { keyword } = req.validated as SearchQueryInput;
    const kw = keyword?.trim() || '';

    const result = await searchService.searchService(kw);

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
