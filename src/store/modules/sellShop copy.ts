import { getSellShop, getShop, getShopList, getShopNames } from '@/api/shop'
import { defineStore } from 'pinia'
import type {
  ShopsResponseData,
  ShopSearch,
  ShopResponseData,
  ShopNamesResponse,
  ShopDetailsResponse,
} from '@/api/shop/type'
import { ShopState } from './types/types'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { useRouter } from 'vue-router'
let $router = useRouter()

const useSellShopStore = defineStore('sellShopStore', {
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
        tabProducts: [],
        products: [],
      },
      shopNames: [],
      shopId: 0,
      shopArr: [],
      scrollTop: 0,
      shopDrawer: false,
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
    async getSellShop(shopId: number) {
      if (isNaN(shopId)) {
        if (this.shopNames.length === 0) {
          await this.getShopItem()
        }
        shopId = this.shopNames[0].id
      }

      let res: ShopDetailsResponse = await getSellShop(shopId)

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
        return this.sho
      } else {
        ElMessage({
          type: 'error',
          message: '搜尋失败',
        })
      }
    },

    async goRoute() {
      if (this.shopId === 0) {
        if (this.shopNames.length === 0) {
          await this.getShopItem()
        }
        this.shopId = this.shopNames[0].id
      }
    },
  },
  getters: {},
})

export default useSellShopStore
