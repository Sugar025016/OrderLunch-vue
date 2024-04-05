import type { RouteRecordRaw } from 'vue-router'
import {
  ShopList,
  ShopData,
  ShopNames,
  ShopDetailData,
  ShopPageResponse,
  ShopSearch,
} from '@/api/shop/type'
import { Address } from '@/api/type'
import { SellProductList } from '@/api/sellProduct/type'
import { Orders } from '@/api/order/type'

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
  cartShopId: number
  cartCount: number
  cartLat: number
  cartLng: number
  cartDeliveryKm: number
  orderCount: number
  shopOrderCount: number
  address: Address | undefined
  getNewOrderTimer: ReturnType<typeof setInterval> | null
  orderNew: Orders
  isCheckAddress: boolean
}

export interface ShopState {
  shop: ShopDetailData
  shopNames: ShopNames
  shopId: number
  shopPage: ShopPageResponse
  shopArr: Set<ShopData>
  scrollTop: number
  shopSearch: ShopSearch
}
export interface SellShopState {
  shop: ShopDetailData
  shopNames: ShopNames
  shopId: number
  shopPage: ShopPageResponse
  // shopArr: Set<ShopData>
  scrollTop: number
  shopDrawer: boolean
  // shopSearch: ShopSearch
}
export interface SellProductState {
  products: SellProductList
  shopId: number
}
