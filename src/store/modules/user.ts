import { defineStore } from 'pinia'
import {
  reqLogin,
  reqUserInfo,
  reqLogOut,
  reqChangeUserInfo,
  reqChangeUserPwd,
  reqFavorites,
  reqChangeFavorite,
} from '@/api/user'
import type {
  LoginFormData,
  LoginResponseData,
  LovesResponseData,
  UserProfile,
  UserProfileChangeResponse,
  UserPwd,
  UserInfoResponseData,
  ChangeLovesResponseData,
} from '@/api/user/type'
import type { UserState } from './types/types'
import router from '@/router'
import { GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import {
  constantRoute,
  asyncRoute,
  anyRoute,
  menuRoutes,
  sellShop,
} from '@/router/routes'

import { ShopData } from '@/api/shop/type'
import useSellShopStore from '@/store/modules/sellShop'
import { Address, Response } from '@/api/type'

// function filterAsyncRoute(asyncRoute: any, routes: any) {
//   return asyncRoute.filter((item: any) => {
//     if (routes.includes(item.name)) {
//       if (item.children && item.children.length > 0) {
//         item.children = filterAsyncRoute(item.children, routes)
//       }
//       return true
//     }
//   })
// }

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: menuRoutes,
      menuSellRoutes: sellShop.children,
      asyncRoute: [...constantRoute, anyRoute],
      username: '',
      account: '',
      email: '',
      phone: '',
      favoriteShop: [],
      avatar: '',
      buttons: [],
      cartShopId: 0,
      cartCount: 0,
      cartLat: 0,
      cartLng: 0,
      cartDeliveryKm: 0,
      orderCount: 0,
      shopOrderCount: 0,
      address: undefined,
      getNewOrderTimer: null,
      orderNew: [],
      isCheckAddress: false,
    }
  },
  // 異步|邏輯的地方
  actions: {
    async userLogin(data: LoginFormData) {
      const formData = new FormData()
      if (data.username !== undefined) {
        formData.append('username', data.username)
      }
      if (data.password !== undefined) {
        formData.append('password', data.password)
      }
      if (data.verifyCode !== undefined) {
        formData.append('captcha', data.verifyCode)
      }
      if (data.rememberMe !== undefined) {
        formData.append('rememberMe', data.rememberMe.toString())
      }

      const res: LoginResponseData = await reqLogin(formData)



      // const loginResponse: Response = res as Response
      // 
      if (res.status === 200) {
        // 
        this.token = GET_TOKEN()

        await this.userInfo()
      }
      return res
    },
    async userInfo() {
      const res: UserInfoResponseData = await reqUserInfo()
      if (res.status === 200) {
        this.username = res.data.name
        this.account = res.data.account
        this.phone = res.data.phone
        this.email = res.data.email
        this.favoriteShop = res.data.favoriteShops
        this.cartShopId = res.data.cartShopId
        this.cartCount = res.data.cartCount
        this.cartLat = res.data.cartLat
        this.cartLng = res.data.cartLng
        this.cartDeliveryKm = res.data.cartDeliveryKm
        this.orderCount = res.data.orderCount
        this.shopOrderCount = res.data.shopOrderCount
        this.address = res.data.address as Address

        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }

    },

    async changeUserInfo(v: UserProfile) {
      const res: UserInfoResponseData = await reqChangeUserInfo(v)
      if (res.status === 200) {
        return await this.userInfo()
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async changeUserPwd(v: UserPwd) {
      const res: UserProfileChangeResponse = await reqChangeUserPwd(v)
      if (res.status === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async getLove() {
      const res: LovesResponseData = await reqFavorites()
      if (res.status === 200) {
        this.favoriteShop = res.data
        return res.data
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async changeFavoriteStore(id: number) {

      const res: ChangeLovesResponseData = await reqChangeFavorite(id)

      if (res.status === 200 && res.data) {
        await this.getLove()
        return this.favoriteShop
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async isLove(id: number) {

      const isFavorite = await this.favoriteShop.some(
        (value: ShopData) => value.id === id,
      )
      if (isFavorite) {
        return '#fd7e14'
      } else {
        return 'rgb(139, 139, 139)'
      }
    },

    async userLogout() {
      const res = await reqLogOut()
      if (res.status === 200) {
        router.push('/')
        // await window.location.reload()
        this.userClear()

        return res
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userClear() {
      this.token = ''
      this.username = ''
      this.account = ''
      this.avatar = ''
      this.orderCount = 0
      this.orderNew = []
      this.email = ''
      this.phone = ''
      this.favoriteShop = []
      this.address = undefined
      this.cartCount = 0
      this.orderCount = 0
      this.setCheckAddress(false)
      REMOVE_TOKEN()
      this.stopTimer()

      const sellShopStore = useSellShopStore()
      sellShopStore.clearSellShopData()
    },
    // async getUserAddress() {
    //   const res: UserInfoResponseData = await reqChangeUserInfo(v)
    //   if (res.status === 200) {
    //     return await this.userInfo()
    //   } else {
    //     return Promise.reject(new Error(res.message))
    //   }
    // },

    // 停止計時器
    stopTimer() {
      if (this.getNewOrderTimer != null) {
        clearInterval(this.getNewOrderTimer)
        this.getNewOrderTimer = null
      }
    },

    async isCheckChooseAddress() {
      if (
        this.account != '' &&
        (this.address === undefined || !this.isCheckAddress)
      ) {
        return true
      }
      return false
    },

    async setCheckAddress(is: boolean) {
      this.isCheckAddress = is
    },
    async setRouteHaveSell(is: boolean) {
      console.log('有sellShop:',is)
      if (is) {
        
        this.asyncRoute = [...constantRoute, sellShop, anyRoute];

        [...constantRoute, sellShop, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
      } else {

        this.asyncRoute = [...constantRoute, anyRoute];

        [...constantRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
      }
      
    },
  },
  getters: {},
})

export default useUserStore
