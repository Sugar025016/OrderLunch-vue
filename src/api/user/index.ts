import request from '@/utils/request'
import type {
  LoginResponseData,
  LovesResponseData,
  UserProfile,
  UserProfileChangeResponse,
  UserPwd,
  UserInfoResponseData,
  ChangeLovesResponseData,
  UserAddress,
  UserAddressResponseData,
  Address,
  Addresses,
} from './type'

enum API {
  LOGIN_URL = '/login',
  USERINFO_URL = '/api/user',
  LOGOUT_URL = '/logout',
  USER_PWD_URL = '/api/user/pwd',
  USER_ADDRESS_URL = '/api/user/address',
  USER_FAVORITE_URL = '/api/user/favorite',
}

export const reqLogin = (data: FormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL)

export const reqLogOut = () => request.get<any, any>(API.LOGOUT_URL)

export const reqChangeUserInfo = (userProfile: UserProfile) =>
  request.put<any, UserInfoResponseData>(API.USERINFO_URL, userProfile)

export const reqChangeUserPwd = (userPwd: UserPwd) =>
  request.put<any, UserProfileChangeResponse>(API.USER_PWD_URL, userPwd)

export const reqFavorites = () =>
  request.get<any, LovesResponseData>(API.USER_FAVORITE_URL)

export const reqChangeFavorite = (id: number) =>
  request.put<any, ChangeLovesResponseData>(API.USER_FAVORITE_URL + '/' + id)

// export const reqUserAddress = () =>
//   request.get<any, UserInfoResponseData>(API.USER_ADDRESS_URL)

export const reqGetUserAddresses = () =>
  request.get<any, UserAddressResponseData>(API.USER_ADDRESS_URL)

export const reqPutUserAddresses = (date: Addresses) =>
  request.put<any, UserAddressResponseData>(API.USER_ADDRESS_URL, date)
