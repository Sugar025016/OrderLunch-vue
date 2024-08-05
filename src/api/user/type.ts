import { ShopList, ShopNames } from '../shop/type'
import { Address, Response } from '../type'

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
  rememberMe: boolean
}

export interface LoginResponseData extends Response {
  data?: LoginResponseData
}
export interface LoginResponseData {
  code?: number
  message?: string
  ok?: boolean
}
export interface UserInfoResponseData extends Response {
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
    shopNames: ShopNames
  }
}

export type Addresses = Address[]

export interface UserAddressResponseData extends Response {
  data: Addresses
}

export interface AddressResponseData extends Response {
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

export interface UserProfileChangeResponse extends Response {
  data: string
}

export interface LovesResponseData extends Response {
  data: ShopList
}

export interface ChangeLovesResponseData extends Response {
  data: boolean
}
