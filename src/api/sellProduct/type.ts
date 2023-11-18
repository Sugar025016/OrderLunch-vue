export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SellProduct {
  id: number
  name: string
  description: string
  imgId?: number
  imgUrl?: URL
  prise: number
  orderable: boolean
}

export type SellProductList = SellProduct[]

export interface ResponseProductList extends ResponseData {
  data: SellProductList
}

export interface ResponseBoolean extends ResponseData {
  data: boolean
}
