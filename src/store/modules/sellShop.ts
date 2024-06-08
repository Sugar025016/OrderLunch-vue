import { reqGetSellShop, getShopNames } from '@/api/shop'
import { defineStore } from 'pinia'
import type {
  ShopNamesResponse,
  ShopDetailsResponse,
  ShopDetailData,
  ShopPageResponse,
} from '@/api/shop/type'
import { SellShopState } from './types/types'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'

const $router = useRouter()

const useSellShopStore = defineStore('sellShopStore', {
  state: (): SellShopState => {
    return {
      shop: {
        id: 0,
        name: '',
        description: '',
        address: {
          id: 0,
          city: '',
          area: '',
          street: '',
          detail: '',
          lat: undefined,
          lng: undefined,
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
        orderable: false,
        tabProducts: [],
        products: [],
      },
      shopNames: [],
      shopId: 0,
      shopPage: {
        content: [],
        totalElements: 0,
        size: 0,
        number: 0,
        totalPages: 0,
      },
      scrollTop: 0,
      shopDrawer: false,
    }
  },
  actions: {
    async getSellShop(shopId: number) {
      if (isNaN(shopId)) {
        if (this.shopNames.length === 0) {
          await this.getShopItem()
        }
        shopId = this.shopNames[0].id
      }
      const res: ShopDetailsResponse = await reqGetSellShop(shopId)

      if (res.status === 200) {
        this.shop = res.data
      } else {
        ElMessage({
          type: 'error',
          message: '搜尋失败',
        })
      }
    },
    // async deleteSellProduct(shopId: number) {},
    async getSellShopThisId() {
      if (this.shopId === 0) {
        if (this.shopNames.length === 0) {
          await this.getShopItem()
        }
        this.shopId = this.shopNames[0].id
      }
      const res: ShopDetailsResponse = await reqGetSellShop(this.shopId)

      if (res.status === 200) {
        this.shop = res.data
      } else {
        ElMessage({
          type: 'error',
          message: '搜尋失败',
        })
      }
    },
    async getShopItem() {
      const userStore = useUserStore()
      if (userStore.account) {
        const res: ShopNamesResponse = await getShopNames()
        console.log('取sellShop:', res)
        if (res.status === 200) {
          userStore.setRouteHaveSell(res.data.length !== 0)
          if (res.data.length === 0) {
            // $router.push('/')ㄘ
            return
          }

          this.shopNames = res.data
          if (this.shopId === 0) {
            this.shopId = this.shopNames[0].id
          }
          return this.shopNames
        } else {
          ElMessage({
            type: 'error',
            message: '搜尋失败',
          })
        }
      }
    },

    async clearSellShopData() {
      this.shop = {} as ShopDetailData
      this.shopNames = []
      this.shopId = 0
      this.shopPage = {} as ShopPageResponse
    },
  },
  getters: {},
})

export default useSellShopStore
