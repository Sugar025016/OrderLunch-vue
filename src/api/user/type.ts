import { ShopList } from '../shop/type'
import { Address } from '../type'

export interface RegisterMember {
  verifyCode: string
  name: string
  account: string
  password: string
  passwordCheck: string
  phone: string
}


export interface LoginFormData {
  username?: string
  password?: string
  verifyCode?: string
}

export interface ResponseData {
  code?: number
  message?: string
  ok?: boolean
}

export interface LoginResponseData extends ResponseData {
  data?: LoginResponseData
}
export interface LoginResponseData {
  code?: number
  message?: string
  ok?: boolean
}
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    account: string
    phone: string
    email: string
    favoriteShops: ShopList
    avatar: string
    cartShopId: number
    cartCount: number
    cartLat: number
    cartLng: number
    cartDeliveryKm: number
    orderCount: number
    shopOrderCount: number
    address?: Address
  }
}


export type Addresses = Address[]

export interface UserAddressResponseData extends ResponseData {
  data: Addresses
}

export interface AddressResponseData extends ResponseData {
  data: Address
}

export interface UserProfile {
  name: string
  account: string
  phone: string
  email: string
  address: Address
}
export interface UserPwd {
  password: string
  NewPassword: string
}

export interface UserProfileChangeResponse extends ResponseData {
  data: string
}

export interface LovesResponseData extends ResponseData {
  data: ShopList
}

export interface ChangeLovesResponseData extends ResponseData {
  data: boolean
}



