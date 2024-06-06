import request from '@/utils/request'
import type { ProductsResponseData } from './type'
enum API {
  PRODUCT = '/product/',
}

export const getProducts = (data: number) =>
  request.get<any, ProductsResponseData>(API.PRODUCT + data)
