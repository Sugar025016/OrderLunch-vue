import request from '@/utils/request'
import type { PutTabData, TabProductsResponseData } from './type'
enum API {
  TAB = '/api/tab',
}

export const reqGetTabProducts = (data: number) =>
  request.get<any, TabProductsResponseData>(API.TAB + '/' + data)

export const reqDeleteTab = (data: number) =>
  request.delete<any, TabProductsResponseData>(API.TAB + '/' + data)

export const reqAddOrUpdateTab = (data: PutTabData) => {
  if (data.id) {
    return request.put<any, any>(API.TAB + '/' + data.id, data)
  } else {
    return request.post<any, any>(API.TAB, data)
  }
}
