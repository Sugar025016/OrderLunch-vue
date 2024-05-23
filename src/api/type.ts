export interface Response {
  status?: number
  message?: string
  ok?: boolean
}

export interface ResponseData extends Response {
  data:Code
}

export interface Code {
  code?: number
  message?: string
  ok?: boolean
}

export interface ResultResponse extends Response {
  data: Code
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
// export interface Address {
//   id?: number
//   city: string | undefined
//   area: string | undefined
//   street: string | undefined
//   detail: string | undefined
//   lat: number | undefined
//   lng: number | undefined
// }

export interface Address {
  id?: number
  city: string
  area: string
  street: string
  detail: string
  lat: number | undefined
  lng: number | undefined
}
