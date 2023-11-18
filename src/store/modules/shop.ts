import { getShop, getShopList, getShopNames } from '@/api/shop'
import { defineStore } from 'pinia'
import type {
  ShopsResponseData,
  ShopSearch,
  ShopResponseData,
  ShopNamesResponse,
} from '@/api/shop/type'
import { ShopState } from './types/types'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { useRouter } from 'vue-router'
let $router = useRouter()

const useShopStore = defineStore('Category', {
  state: (): ShopState => {
    return {
      shop: {
        id: 0,
        name: '',
        description: '',
        address: {
          id: 0,
          city: '',
          area: '',
          detail: '',
        },
        phone: '',
        imgId: 0,
        imgUrl: '',
        schedules: [
          {
            id: 0,
            week: 0,
            timePeriods: [
              {
                startTime: '',
                endTime: '',
              },
            ],
          },
        ],
        isOrderable: false,
      },
      shopNames: [],
      shopId: 0,
      shopArr: [],
      scrollTop: 0,
    }
  },
  actions: {
    async getShopList(data: ShopSearch) {
      const res: ShopsResponseData = await getShopList(data)
      if (res.code === 200) {
        this.shopArr = res.data
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // async getShop2() {
    //   let res: ShopResponseData = await getShop(this.shopId)
    //
    //   if (res.code === 200) {
    //     this.shop = res.data
    //   } else {
    //     ElMessage({
    //       type: 'error',
    //       message: '搜尋失败',
    //     })
    //   }
    // },

    async getShop(shopId: number) {
      let res: ShopResponseData = await getShop(shopId)

      if (res.code === 200) {
        this.shop = res.data
      } else {
        ElMessage({
          type: 'error',
          message: '搜尋失败',
        })
      }
    },
    async getShopItem() {
      let res: ShopNamesResponse = await getShopNames()
      if (res.code === 200) {
        if (res.data.length === 0) {
          $router.push('/')
        }
        this.shopNames = res.data
        if (this.shopId === 0) {
          this.shopId = this.shopNames[0].id
        }
      } else {
        ElMessage({
          type: 'error',
          message: '搜尋失败',
        })
      }
    },
  },
  getters: {
    getStoreData: (state) => state.shop,
  },
})

export default useShopStore
