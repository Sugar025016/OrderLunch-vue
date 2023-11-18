import request from '@/utils/request'
import type {
  SearchShopData,
  SearchShopRequestData,
  SearchShopsRequestData,
} from './type'
enum API {
  TAB = '/backstage/tab',
  TAB_NAME = '/backstage/tab/name',
}

export const reqTab = (data: number) =>
  request.get<any, SearchShopRequestData>(API.TAB + '/' + data)

export const reqSearchTab = (data: string) =>
  request.get<any, SearchShopsRequestData>(API.TAB_NAME + '/' + data)
