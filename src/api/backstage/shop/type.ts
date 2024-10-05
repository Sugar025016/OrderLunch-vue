export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export type ShopList = ShopData[]
export interface Address {
  id?: number
  city: string
  area: string
  detail: string
}
export interface ShopData {
  id?: number
  userAccount: string
  userName: string
  shopName: string
  phone: string
  description: string
  tabs: string
  address: Address
  imgId?: number
  imgUrl?: URL
  createTime?: string
  updateTime?: string
  isOrderable: boolean
  isOpen: boolean
  isDelete: boolean
}

export interface Page {
  content: ShopList
  totalElements: number
  size: number
  number: number
  totalPages: number
}

export interface ShopResponseData extends ResponseData {
  data: Page
}

export interface ShopSearch {
  city?: string
  area?: string
  categoryId?: number
  other?: string
}

export interface ShopAddRequest {
  userAccount: string
  shopName: string
  phone: string
  description: string
  address: Address
  imgId?: number
  img?: string
}

export interface ShopPutRequest {
  id?: number
  userAccount: string
  shopName: string
  phone: string
  description: string
  address: Address
  imgId?: number
  imgUrl?: string
  isOrderable: boolean
  open: boolean
}
