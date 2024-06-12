import { getShop, reqGetShopPage, getShopNames } from '@/api/shop'
import { defineStore } from 'pinia'
import type {
  ShopResponseData,
  ShopNamesResponse,
  GetShopPageResponse,
  ShopData,
} from '@/api/shop/type'
import { ShopState } from './types/types'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import useUserStore from './user'
const $router = useRouter()

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
          street: '',
          detail: '',
          lat: 0,
          lng: 0,
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
        number: -1,
        totalPages: 0,
      },
      shopArr: new Set<ShopData>(),
      scrollTop: 0,
      shopSearch: {},
    }
  },
  actions: {
    async getShopPage(page = 0) {
      if (page === 0) {
        await this.shopArr.clear()
      }
      const userStore = useUserStore()
      this.shopSearch.userAddressId = userStore.address?.id

      const res: GetShopPageResponse = await reqGetShopPage(
        this.shopSearch,
        page,
      )

      if (res.status === 200) {
        this.shopPage = res.data
        res.data.content.forEach((shopData) => {
          this.shopArr.add(shopData)
        })
        // await
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async getShop(shopId: number) {
      const res: ShopResponseData = await getShop(shopId)

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
      const res: ShopNamesResponse = await getShopNames()
      if (res.status === 200) {
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
