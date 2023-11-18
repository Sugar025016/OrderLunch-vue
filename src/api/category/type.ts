export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export type CategoryList = Category[]

export interface Category {
  id?: number
  name: string
}

export interface CategoryListResponse extends ResponseData {
  data: CategoryList
}
