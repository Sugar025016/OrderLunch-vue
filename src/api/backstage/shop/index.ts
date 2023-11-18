import request from '@/utils/request'
import type { ShopSearch, ShopData, ShopResponseData } from './type'
enum API {
  SHOP = '/backstage/shop',
  SHOP_NAME = '/backstage/shop/name',
}

export const getShop = (data: number) =>
  request.get<any, ShopData>(API.SHOP + '/' + data)

export const reqShopInfo = (page: number, limit: number, data: ShopSearch) =>
  request.get<any, ShopResponseData>(
    API.SHOP + `?name=${data.other}&page=${page - 1}&size=${limit}`,
  )

export const reqBackstageAddOrUpdateShop = (data: ShopData) => {
  if (data.id) {
    return request.put<any, any>(API.SHOP, data)
  } else {
    return request.post<any, any>(API.SHOP, data)
  }
}

export const reqRemoveShop = (data: number) =>
  request.delete<any, ShopData>(API.SHOP + '/' + data)
