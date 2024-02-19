export interface ResponseData {
  code?: number
  message?: string
  ok?: boolean
}

export interface ResultResponse extends ResponseData {
  data: boolean
}

export interface Page {
  totalElements: number
  size: number
  number: number
  totalPages: number
}

// export interface PageResponse extends Response {
//   data: Page
// }

// export interface Address {
//   id?: number
//   city: string
//   area: string
//   detail: string
// }
export interface Address {
  id?: number
  city: string | undefined
  area: string | undefined
  street: string | undefined
  detail: string | undefined
  lat: number | undefined
  lng: number | undefined
}