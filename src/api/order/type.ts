import { Response, Page, Address } from '../type'

export interface OrderResponse extends Response {
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

export interface GetOrderPageResponse extends Response {
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

export interface GetOrderFinishPageResponse extends Response {
  data: OrderFinishPage
}

export interface GetOrderNewResponse extends Response {
  data: Orders
}
