import { Response } from '../type'

export interface SellProduct {
  id: number
  name: string
  description: string
  imgId?: number
  imgUrl?: URL
  price: number
  orderable: boolean
}

export type SellProductList = SellProduct[]

export interface ResponseProductList extends Response {
  data: SellProductList
}

export interface ResponseBoolean extends Response {
  data: boolean
}
