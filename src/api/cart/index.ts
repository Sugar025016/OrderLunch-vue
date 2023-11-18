import request from '@/utils/request'
import type { CartResponseData, CartRequest } from './type'
enum API {
  cart = '/api/cart',
}

export const apiGetCart = () => request.get<any, CartResponseData>(API.cart)

export const apiDeleteCart = (data: number) => {
  return request.delete<any, CartResponseData>(API.cart + '/' + data)
}

export const apiAddCart = (data: CartRequest) => {
  return request.post<any, any>(API.cart, data)
}

export const apiPutCart = (cartId: number, qty: number) => {
  return request.put<any, any>(API.cart + '/' + cartId + '/' + qty)
}
