import request from '@/utils/request'
import type {
  AddOrder,
  GetOrderNewResponse,
  GetOrderPageResponse,
} from './type'
import { ResultResponse } from '../type'

enum API {
  ORDER_URL = '/order',
  ORDER_SELL_URL = '/order/sell',
  ORDER_NEW_URL = '/order/new',
}
export const reqAddOrder = (data: AddOrder) =>
  request.post<any, ResultResponse>(API.ORDER_URL, data)

export const reqGetOrder = (page = 1) =>
  request.get<any, GetOrderPageResponse>(API.ORDER_URL + '/' + page)

export const reqGetOrderByShop = (
  shopId = 1,
  classify: number,
  limit: number,
  page: number,
) =>
  request.get<any, GetOrderPageResponse>(
    API.ORDER_SELL_URL +
      '/' +
      shopId +
      `?classify=${classify}&page=${page - 1}&size=${limit}`,
  )

export const reqPutOrderByShop = (
  shopId = 1,
  status: number,
  orderIds: number[],
) =>
  request.put<any, ResultResponse>(
    API.ORDER_URL + '/' + shopId + '/' + status,
    orderIds,
  )

export const reqPutOrderStatus = (status: number, orderIds: number[]) =>
  request.put<any, ResultResponse>(API.ORDER_URL + '/' + status, orderIds)

export const reqGetOrderNew = () =>
  request.get<any, GetOrderNewResponse>(API.ORDER_NEW_URL)
