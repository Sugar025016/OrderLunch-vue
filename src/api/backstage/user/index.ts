import request from '@/utils/request'
import type { UserResponseData, User, SearchUserResponseData } from './type'

enum API {
  USER_URL = '/backstage/user',
  UPDATEUSER_URL = '/backstage/user',
  ALLROLEURL = '/admin/acl/user/toAssign/',
  SETROLE_url = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
  USER_ACCOUNT_URL = '/backstage/user/account',
}

export const getBackstageUser = (
  page: number,
  limit: number,
  username: string,
) =>
  request.get<any, UserResponseData>(
    API.USER_URL + `?name=${username}&page=${page - 1}&size=${limit}`,
  )

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL + '/' + data.id, data)
  } else {
    return request.post<any, any>(API.USER_URL, data)
  }
}

export const reqSearchUser = (data: string) =>
  request.get<any, SearchUserResponseData>(API.USER_ACCOUNT_URL + '/' + data)
