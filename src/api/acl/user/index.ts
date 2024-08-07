import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'

enum API {
  ALLUSER_URL = '/backstage/user',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLEURL = '/admin/acl/user/toAssign/',
  SETROLE_url = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo2 = (page: number, limit: number) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `?page=${page}&limit=${limit}`,
  )

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)

export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_url, data)

export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId)

export const reqSelectUser = (idList: number[]) =>
  request.delete(API.DELETEALLUSER_URL, { data: idList })
