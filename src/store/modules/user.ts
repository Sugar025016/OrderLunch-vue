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
  Address,
  ChangeLovesResponseData,
} from '@/api/user/type'
import type { UserState } from './types/types'
import { GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import {
  constantRoute,
  asyncRoute,
  anyRoute,
  menuRoutes,
  menuSellRoutes,
  sellShop,
} from '@/router/routes'

// @ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
import { useRouter } from 'vue-router'
import { ShopData } from '@/api/shop/type'
import { GetOrderNewResponse } from '@/api/order/type'
// import { ElMessage } from 'element-plus/es/components/index.js'
// import { ElMessage } from 'element-plus/lib/components/index.js'
import { reqGetOrderNew } from '@/api/order'
import ElMessage from 'element-plus/lib/components/message/index.js'
import useSellShopStore from '@/store/modules/sellShop'
import { ResponseData } from '@/api/type'



function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: menuRoutes,
      menuSellRoutes: sellShop[0].children,
      asyncRoute: [...constantRoute, ...asyncRoute, anyRoute],
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
  // 异步|逻辑的地方
  actions: {
    //用户登录方法
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

      const res: LoginResponseData = await reqLogin(formData)

      // console.log("*********",res)
      // success=>token
      // error=>error.message

      console.log("登入：：：", res)
      const loginResponse: ResponseData = res.data as ResponseData
      if (loginResponse.code === 200) {
        this.token = GET_TOKEN()
        await this.userInfo()
      }
      return loginResponse;
      // return loginResponse;

      // if (loginResponse.code === 200) {
      //   // console.log("*********",res)
      //   this.token = GET_TOKEN()
      //   await this.userInfo()
      //   return 'ok'
      // } else {
      //   console.log("**********//////登入：：：//////**********")
      //   // Promise.reject(new Error(loginResponse.message as string))
      //   return loginResponse.code;
      // }
    },
    async userInfo() {
      const res: UserInfoResponseData = await reqUserInfo()
      console.log("**********//////UserInfoResponseData：：：//////**********", res)
      if (res.code === 200) {
        // const userStore = useUserStore();
        // userStore.clearData()
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


        // const userAsyncRoute = filterAsyncRoute(
        //   cloneDeep(asyncRoute),
        //   this.token,
        // )


        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
      // this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
      // ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
      //   router.addRoute(route)
      // })
      // } else {
      //
      //   return Promise.reject(new Error(res.message))
      // }
    },

    async changeUserInfo(v: UserProfile) {
      const res: UserInfoResponseData = await reqChangeUserInfo(v)
      if (res.code === 200) {
        return await this.userInfo()
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async changeUserPwd(v: UserPwd) {
      const res: UserProfileChangeResponse = await reqChangeUserPwd(v)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async getLove() {
      const res: LovesResponseData = await reqFavorites()
      if (res.code === 200) {
        this.favoriteShop = res.data
        return res.data
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async changeFavoriteStore(id: number) {
      const res: ChangeLovesResponseData = await reqChangeFavorite(id)

      if (res.code === 200 && res.data) {
        await this.getLove()
        return this.favoriteShop
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async isLove(id: number) {
      const isFavorite = this.favoriteShop.some(
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
      if (res.code === 200) {
        await window.location.reload();
        console.log("///////////*************///////////")
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

      let sellShopStore = useSellShopStore()
      sellShopStore.clearSellShopData();
    },
    async getUserAddress() {
      const res: UserInfoResponseData = await reqChangeUserInfo(v)
      if (res.code === 200) {
        return await this.userInfo()
      } else {
        return Promise.reject(new Error(res.message))
      }
    },

    //沒用到
    // async getOrderNew() {
    //   if (this.token != '') {
    //     let res: GetOrderNewResponse = await reqGetOrderNew()
    //     if (res.code === 200) {
    //       this.orderNew = res.data
    //     } else {
    //       ElMessage({
    //         type: 'error',
    //         message: '搜尋失败',
    //       })
    //     }
    //   }
    // },
    // startTimer() {
    //   this.getNewOrderTimer = setInterval(() => {
    //     this.getOrderNew()
    //   }, 1000); // 1000 毫秒，即 1 秒
    // },

    // 停止計時器
    stopTimer() {
      if (this.getNewOrderTimer != null) {
        clearInterval(this.getNewOrderTimer);
        this.getNewOrderTimer = null;
      }
    },

    async isCheckChooseAddress() {
      if(this.account!=""&& (this.address===undefined || !this.isCheckAddress)){

        return true
      }
        return false
    },

    async setCheckAddress(is:boolean) {
      this.isCheckAddress=is;
    },
  },
  getters: {},
})

export default useUserStore
