import { ResponseData, Page, Address } from '../type'

export interface OrderResponse extends ResponseData {
  data: boolean
}

export interface AddOrder {
  takeTime: string
  addressId: number
  remark: string
}

export interface OrderPageResponse extends Page {
  content: Orders
}

export interface GetOrderPageResponse extends ResponseData {
  data: OrderPageResponse
}

export type Orders = Order[]

export interface Order {
  shopId?: number
  orderId: number
  shopName: string
  name: string
  description: string
  imgUrl: string
  totalPrise: number
  remark: string
  status: number
  statusChinese: string
  orderTime: string
  takeTime: string
  address: Address
  orderDetails: OrderDetails
}

export interface OrderDetail {
  orderDetailId: number
  productId: number
  productName: string
  qty: number
  prise: number
  remark: string
  imgUrl:URL
}

export type OrderDetails = OrderDetail[]

export interface OrderFinish {
  orderId: number
  shopName: string
  name: string
  description: string
  imgUrl: string
  totalPrise: number
  remark: string
  status: number
  statusChinese: string
  orderTime: string
  takeTime: string
  address: Address
  orderDetails: OrderDetails
}

export interface OrderFinishPage extends Page {
  content: OrderFinish
}

export interface GetOrderFinishPageResponse extends ResponseData {
  data: OrderFinishPage
}

export interface GetOrderNewResponse extends ResponseData {
  data: Orders
}
