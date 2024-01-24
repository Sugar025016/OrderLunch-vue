import { TabsData, ProductList } from '../tab/type'
import { Response, Page, Address } from '../type'

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface ShopIDResponseData extends ResponseData {
  data: number
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

export interface ShopPageResponse extends Page {
  content: ShopList
}
export interface GetShopPageResponse extends Response {
  data: ShopPageResponse
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

// export interface Address {
//   id?: number
//   city: string
//   area: string
//   detail: string
// }

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
  orderable: boolean
}

export interface ShopData {
  id: number
  name: string
  description: string
  address: string
  phone?: string
  imgUrl: string
  schedules?: Schedules
  orderable?: boolean
}

export interface PutShopData {
  id: number
  name: string
  description: string
  address: Address
  phone?: string
  imgId: number
  imgUrl: string
  orderable: boolean
  disable: boolean
}

export interface ShopDetailsResponse extends ResponseData {
  data: ShopDetailData
}

export interface PutShopResponse extends ResponseData {
  data: boolean
}

export interface ReqShopData {
  name: string
  phone?: string
  description: string
  address: Address
  captcha: string
}


export interface RegisterShop {
  captcha: string
  shopName: string
  phone: string
  description: string
  addressId: number
  addressDetail:string
}