import request from '@/utils/request'
import type { CartResponseData, CartRequest } from './type'
enum API {
  cart = '/cart',
}

export const reqGetCart = () => request.get<any, CartResponseData>(API.cart)

export const reqDeleteCart = (data: number) => {
  return request.delete<any, CartResponseData>(API.cart + '/' + data)
}

export const reqDeleteAllCart = () => {
  return request.delete<any, CartResponseData>(API.cart)
}

export const reqAddCart = (data: CartRequest) => {
  return request.post<any, any>(API.cart, data)
}

export const reqPutCart = (cartId: number, qty: number) => {
  return request.put<any, any>(API.cart + '/' + cartId + '/' + qty)
}
