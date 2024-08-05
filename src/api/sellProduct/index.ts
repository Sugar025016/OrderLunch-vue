import request from '@/utils/request'
import type { ResponseBoolean, ResponseProductList, SellProduct } from './type'
enum API {
  PRODUCT = '/product',
}

export const reqGetSellProducts = (shopId: number) =>
  request.get<any, ResponseProductList>(API.PRODUCT + '/' + shopId)

export const reqDeleteSellProducts = (productId: number) =>
  request.delete<any, ResponseBoolean>(API.PRODUCT + '/' + productId)

export const reqAddOrUpdateSellProduct = (
  shopId: number,
  data: SellProduct,
) => {
  if (data.id) {
    return request.put<any, ResponseBoolean>(API.PRODUCT + '/' + data.id, data)
  } else {
    return request.post<any, ResponseBoolean>(API.PRODUCT + '/' + shopId, data)
  }
}
