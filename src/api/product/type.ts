export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface ProductData {
  id: number
  name: string
  description: string
  imgUrl: string
  isOrderable: boolean
  price: number
  shopId: number
}
// export interface ProductData {
//   id: number | string
//   name: string
//   description: string
//   imgUrl: string
// }

export type ProductList = ProductData[]

export interface ProductsResponseData extends ResponseData {
  data: ProductList
}
