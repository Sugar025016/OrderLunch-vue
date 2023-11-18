import { TabsData, ProductList } from '../tab/type'

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

export type ShopList = ShopData[]

export type Schedules = Schedule[]
export interface Schedule {
  id?: number
  week: number
  timePeriods: TimePeriods
}

export interface PutSchedule {
  type: number
  schedules: Schedules
}

export type TimePeriods = TimePeriod[]
export interface TimePeriod {
  startTime: string
  endTime: string
}

export interface ShopsResponseData extends ResponseData {
  data: ShopList
}

export interface ShopResponseData extends ResponseData {
  data: ShopDetailData
}

export interface Category {
  id?: number
  name: string
}

export interface ShopSearch {
  city?: string
  area?: string
  categoryId?: number
  other?: string
}

export interface ShopName {
  id: number
  name: string
}

export type ShopNames = ShopName[]
export interface ShopNamesResponse extends ResponseData {
  data: ShopNames
}

export interface Address {
  id?: number
  city: string
  area: string
  detail: string
}

export interface ShopDetailData {
  id: number
  name: string
  description: string
  address: Address
  phone?: string
  imgId: number
  imgUrl: string
  schedules?: Schedules
  tabProducts: TabsData
  products: ProductList
  isOrderable: boolean
}

export interface ShopData {
  id: number
  name: string
  description: string
  address: string
  phone?: string
  imgUrl: string
  schedules?: Schedules
  isOrderable?: boolean
}

export interface PutShopData {
  id: number
  name: string
  description: string
  address: Address
  phone?: string
  imgId: number
  imgUrl: string
  isOrderable: boolean
  isDisable: boolean
}

export interface ShopDetailsResponse extends ResponseData {
  data: ShopDetailData
}

export interface PutShopResponse extends ResponseData {
  data: boolean
}
