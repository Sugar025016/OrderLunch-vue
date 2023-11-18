import { ProductData } from '../product/type'
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export type ProductList = ProductData[]

export interface TabData {
  id: number
  name: string
  shelve: boolean
  products: ProductList
}

export type TabsData = TabData[]

export interface TabProductsResponseData extends ResponseData {
  data: TabsData
}

export interface ProductModalData {
  productId: number
  name: string
  description: string
  qty: number
  imgUrl: string
  prise: number
  department: string
  orderUsername: string
  remark: string
}

export interface PutTabData {
  id?: number
  name: string
  shopId: number
  shelve: boolean
  productIds: Number[]
}
