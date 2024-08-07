import request from '@/utils/request'
import type {
  ShopsResponseData,
  ShopSearch,
  ShopResponseData,
  ShopNamesResponse,
  ShopDetailsResponse,
  PutSchedule,
  PutShopData,
  PutShopResponse,
  GetShopPageResponse,
  RegisterShop,
  ShopIDResponseData,
} from './type'

enum API {
  SHOPS = '/shop',
  SHOPS_RECOMMEND = '/shop/recommend',
  SHOP = '/shop/',
  SHOP_SELL = '/shop/sell',
  SCHEDULE = '/schedule',
  SHOP_REGISTER = '/shop/register',
}

export const getShop = (data: number) =>
  request.get<any, ShopResponseData>(API.SHOP + data)

// export const getShopList = () =>
//   request.get<any, ShopsResponseData>(
//     API.SHOPS
//   )

// export const getShopList = (data: ShopSearch) =>
//   request.get<any, ShopsResponseData>(
//     API.SHOPS +
//     '?' +
//     `${data.city !== undefined ? 'city=' + data.city : null}` +
//     `&${data.area !== undefined ? 'area=' + data.area : null}` +
//     `&${data.categoryId !== undefined ? 'categoryId=' + data.categoryId : null
//     }` +
//     `&${data.other !== undefined ? 'other=' + data.other : null}`,
//   )
// export const reqGetShopPage = (data: ShopSearch, page: number, limit: number = 5) =>{
//   if (data.userAddressId) {
//     return   request.get<any, GetShopPageResponse>(
//       API.SHOP + data.userAddressId +
//       `?name=${data.other}&page=${page}&size=${limit}` +
//       `&${data.categoryId !== undefined ? 'categoryId=' + data.categoryId : null
//       }` +
//       `&${data.other !== undefined ? 'other=' + data.other : null}`,)
//   } else {
//     return   request.get<any, GetShopPageResponse>(
//       API.SHOP + `?name=${data.other}&page=${page}&size=${limit}` +
//       `&${data.city !== undefined ? 'city=' + data.city : null}` +
//       `&${data.area !== undefined ? 'area=' + data.area : null}` +
//       `&${data.categoryId !== undefined ? 'categoryId=' + data.categoryId : null
//       }` +
//       `&${data.other !== undefined ? 'other=' + data.other : null}`,)
//   }
// }
export const reqGetShopPage = (data: ShopSearch, page: number, limit = 5) =>
  request.get<any, GetShopPageResponse>(
    API.SHOP +
      `?name=${data.other}&page=${page}&size=${limit}` +
      `&${
        data.userAddressId !== undefined
          ? 'userAddressId=' + data.userAddressId
          : null
      }` +
      `&${data.city !== undefined ? 'city=' + data.city : null}` +
      `&${data.area !== undefined ? 'area=' + data.area : null}` +
      `&${
        data.categoryId !== undefined ? 'categoryId=' + data.categoryId : null
      }` +
      `&${data.other !== undefined ? 'other=' + data.other : null}`,
  )

export const getRecommendShops = (data: ShopSearch) =>
  request.get<any, ShopsResponseData>(API.SHOPS_RECOMMEND, { params: data })

// export const getRecommendShops = (data: ShopSearch) =>
// request.get<any, ShopsResponseData>(API.SHOPS_RECOMMEND)

export const getShopNames = () =>
  request.get<any, ShopNamesResponse>(API.SHOP_SELL)

export const reqGetSellShop = (data: number) =>
  request.get<any, ShopDetailsResponse>(API.SHOP_SELL + '/' + data)

export const reqPutSchedule = (shopId: number, schedule: PutSchedule) =>
  request.put<any, ShopDetailsResponse>(API.SCHEDULE + '/' + shopId, schedule)

export const reqAddOrUpdateShop = (data: PutShopData) => {
  if (data.id) {
    return request.put<any, PutShopResponse>(API.SHOP_SELL, data)
  } else {
    return request.post<any, PutShopResponse>(API.SHOP_SELL, data)
  }
}

export const reqAddShop = (data: RegisterShop) =>
  request.post<any, ShopIDResponseData>(API.SHOP_REGISTER, data)
