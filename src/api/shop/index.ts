import request from '@/utils/request'
import type {
  ShopsResponseData,
  ShopSearch,
  ShopResponseData,
  ShopNamesResponse,
  ShopDetailsResponse,
  PutSchedule,
  ShopData,
  PutShopData,
  PutShopResponse,
} from './type'
enum API {
  SHOPS = '/api/shop',
  SHOPS_RECOMMEND = '/api/shop/recommend',
  SHOP = '/api/shop/',
  SELL_SHOP = '/sell/shop',
  SCHEDULE = '/api/schedule',
}

export const getShop = (data: number) =>
  request.get<any, ShopResponseData>(API.SHOP + data)

// export const getShopList = () =>
//   request.get<any, ShopsResponseData>(
//     API.SHOPS
//   )

export const getShopList = (data: ShopSearch) =>
  request.get<any, ShopsResponseData>(
    API.SHOPS +
      '?' +
      `${data.city !== undefined ? 'city=' + data.city : null}` +
      `&${data.area !== undefined ? 'area=' + data.area : null}` +
      `&${
        data.categoryId !== undefined ? 'categoryId=' + data.categoryId : null
      }` +
      `&${data.other !== undefined ? 'other=' + data.other : null}`,
  )

export const getRecommendShops = (data: ShopSearch) =>
  request.get<any, ShopsResponseData>(API.SHOPS_RECOMMEND, data)

// export const getRecommendShops = (data: ShopSearch) =>
// request.get<any, ShopsResponseData>(API.SHOPS_RECOMMEND)

export const getShopNames = () =>
  request.get<any, ShopNamesResponse>(API.SELL_SHOP)

export const getSellShop = (data: number) =>
  request.get<any, ShopDetailsResponse>(API.SELL_SHOP + '/' + data)

export const reqPutSchedule = (shopId: number, schedule: PutSchedule) =>
  request.put<any, ShopDetailsResponse>(API.SCHEDULE + '/' + shopId, schedule)

export const reqAddOrUpdateShop = (data: PutShopData) => {
  if (data.id) {
    return request.put<any, PutShopResponse>(API.SHOP, data)
  } else {
    return request.post<any, PutShopResponse>(API.SHOP, data)
  }
}
