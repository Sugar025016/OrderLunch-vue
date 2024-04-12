import { Schedules } from '@/api/shop/type'
import { Response } from '../type'



export interface CartsData {
  shopId?: number
  shopName: string
  orderable: boolean
  deliveryKm: number
  cartResponses: CartList
  schedules: Schedules
  deliveryPrice: number
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

export interface CartResponseData extends Response {
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
