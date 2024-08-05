import { ProductData } from '../product/type'
import { Response } from '../type'

export type ProductList = ProductData[]

export interface AddMealsData {
  id?: number
  name?: string
  shelve?: boolean
  products?: [
    {
      id: number
      price: number
      product: ProductData
    },
  ]
}

export type AddMealsListData = AddMealsData[]

export interface AddMealsProductsResponseData extends Response {
  data: AddMealsListData
}

export interface ProductModalData {
  productId: number
  name: string
  description: string
  qty: number
  imgUrl: string
  price: number
  department: string
  orderUsername: string
  remark: string
  shopId: number
}

export interface PutAddMealsData {
  name: string
  shopId: number
  shelve: boolean
  products: [
    {
      id: number
      price: number
    },
  ]
}
