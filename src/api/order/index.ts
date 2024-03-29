import request from '@/utils/request'
import type {
  AddOrder,
  GetOrderFinishPageResponse,
  GetOrderNewResponse,
  GetOrderPageResponse,
} from './type'
import { ResultResponse } from '../type'

enum API {
  ORDER_URL = '/api/order',
  SELL_ORDER_URL = '/sell/order',
  SELL_ORDER_URL_NEW = '/sell/order/new',
}
export const reqAddOrder = (data: AddOrder) =>
  request.post<any, ResultResponse>(API.ORDER_URL, data)

export const reqGetOrder = (page: number = 1) =>
  request.get<any, GetOrderPageResponse>(API.ORDER_URL + '/' + page)

export const reqGetOrderByShop = (
  shopId: number = 1,
  classify: number,
  limit: number,
  page: number,
) =>
  request.get<any, GetOrderPageResponse>(
    API.SELL_ORDER_URL +
    '/' +
    shopId +
    `?classify=${classify}&page=${page - 1}&size=${limit}`,
  )

export const reqPutOrderByShop = (
  shopId: number = 1,
  status: number,
  orderIds: number[],
) =>
  request.put<any, ResultResponse>(
    API.SELL_ORDER_URL + '/' + shopId + '/' + status,
    orderIds,
  )

export const reqPutOrderStatus = (
  status: number,
  orderIds: number[]
) =>
  request.put<any, ResultResponse>(
    API.SELL_ORDER_URL + '/' + status,
    orderIds
  )

export const reqGetOrderNew = () =>
  request.get<any, GetOrderNewResponse>(
    API.SELL_ORDER_URL_NEW
  )
