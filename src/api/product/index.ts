import request from '@/utils/request'
import type { ProductsResponseData } from './type'
enum API {
  PRODUCT = '/api/product/',
  SHOP = '/api/shop/',
}

export const getProducts = (data: number) =>
  request.get<any, ProductsResponseData>(API.PRODUCT + data)
