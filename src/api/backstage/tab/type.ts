export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SearchTabData {
  id: number
  name: string
}

export type SearchTabsData = SearchTabData[]

export interface SearchShopData {
  id: number
  name: string
  tabs: SearchTabsData
}

export type SearchShopsData = SearchShopData[]

export interface SearchShopsRequestData extends ResponseData {
  data: SearchShopsData
}

export interface SearchShopRequestData extends ResponseData {
  data: SearchShopData
}
