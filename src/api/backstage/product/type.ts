export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Address {
  id?: number
  city: string
  area: string
  detail: string
}
export interface ProductData {
  shopId: number
  shopName: string
  id?: number
  productName: string
  description: string
  price: number
  orderable: boolean
  delete: boolean
  createTime?: string
  updateTime?: string
  imgId?: number
  imgUrl?: URL
}

export type ProductList = ProductData[]

export interface Page {
  content: ProductList
  totalElements: number
  size: number
  number: number
  totalPages: number
}

export interface ProductResponseData extends ResponseData {
  data: Page
}

export interface ProductSearch {
  city?: string
  area?: string
  categoryId?: number
  other?: string
}

export interface ProductPutRequest {
  shopId?: number
  shopName: string
  id?: number
  productName: string
  description: string
  price: number
  isOrderable: boolean
  isDelete: boolean
  imgId?: number
  imgUrl?: URL
}

export interface ProductAddRequest {
  shopId?: number
  shopName: string
  tabId?: number
  tabName: string
  id?: number
  productName: string
  description: string
  price: number
  isOrderable: boolean
  isDelete: boolean
  createTime: string
  updateTime: string
  imgId?: number
  imgUrl?: URL
}

export interface ProductOrderResponseData extends ResponseData {
  data: boolean
}
