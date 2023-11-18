import { Schedule, Schedules } from '@/api/shop/type'

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CartsData {
  shopId?: number
  shopName: string
  orderable: boolean
  cartResponses: CartList
  schedules: Schedules
}

export type CartList = CartData[]

export interface CartData {
  cartId: number
  department: string
  orderUsername: string
  qty: number
  remark: string
  productResponse: ProductResponse
}

export interface ProductResponse {
  productId?: number
  productName: string
  price: number
  isOrderable: boolean
}

export interface CartResponseData extends ResponseData {
  data: CartsData
}

export interface CartRequest {
  cartId?: number
  productId: number
  department?: string
  orderUsername: string
  qty: number
  remark: string
}
