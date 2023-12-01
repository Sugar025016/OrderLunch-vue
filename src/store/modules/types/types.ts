import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj, ProductList } from '@/api/product/type'
import {
  Category,
  ShopList,
  ShopData,
  ShopNames,
  ShopDetailData,
} from '@/api/shop/type'
import { Address } from '@/api/user/type'
import { SellProductList } from '@/api/sellProduct/type'

export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  menuSellRoutes: RouteRecordRaw[]
  asyncRoute: RouteRecordRaw[]
  username: string
  account: string
  email: string
  phone: string
  avatar: string
  buttons: string[]
  favoriteShop: ShopList
  cartCount: number
  orderCount: number
  shopOrderCount: number
  addresses: Address
}

// export interface CategoryState {
//   c1Id: string | number
//   c2Id: string | number
//   c3Id: string | number
//   c1Arr: Shop[]
//   c2Arr: CategoryObj[]
//   c3Arr: CategoryObj[]
//   c4Arr: Category[]
//   c5Arr: Shop
// }

export interface ShopState {
  shop: ShopDetailData
  shopNames: ShopNames
  shopId: number
  shopArr: ShopList
  scrollTop: number
  shopDrawer: boolean
}
export interface SellProductState {
  products: SellProductList
  shopId: number
}
