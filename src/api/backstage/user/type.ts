import { Response } from "@/api/type"


export interface content {
  id?: number
  createTime?: string
  updateTime?: string
  name?: string
  account?: string
  phone?: string
  roleName?: string
  email?: string
}

export type Contents = content[]

export interface Users {
  content: Contents
  totalElements: number
  size: number
  number: number
  totalPages: number
}

export interface UserResponseData extends Response {
  data: Users
}

export interface User {
  id?: number
  account?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
  createTime?: string
  updateTime?: string
}

export interface SearchUser {
  account?: string
}

export type SearchUsers = SearchUser[]

export interface SearchUserResponseData extends Response {
  data: SearchUsers
}
