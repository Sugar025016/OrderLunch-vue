import { getShop, reqGetShopPage, getShopNames } from '@/api/shop'
import { defineStore } from 'pinia'
import type {
  ShopResponseData,
  ShopNamesResponse,
  GetShopPageResponse,
  ShopData,
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
        tabProducts: [],
        products: []
      },
      shopNames: [],
      shopId: 0,
      shopPage: {
        content: [],
        totalElements: 0,
        size: 0,
        number: -1,
        totalPages: 0
      },
      shopArr:new Set<ShopData>,
      scrollTop: 0,
      shopSearch:{}
    }
  },
  actions: {
    async getShopPage(page:number = 0) {
      console.log("page", page )
      const res: GetShopPageResponse = await reqGetShopPage(this.shopSearch ,page)
      if (res.code === 200) {
        this.shopPage = res.data
        res.data.content.forEach((shopData) => {
          this.shopArr.add(shopData);
        });
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
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
