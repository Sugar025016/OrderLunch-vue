import request from '@/utils/request'
import type { CategoryListResponse } from './type'
enum API {
  CATEGORY = '/api/category',
}

export const getCategoryList = () =>
  request.get<any, CategoryListResponse>(API.CATEGORY)
