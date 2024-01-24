import { getSellShop, getShop,  getShopNames } from '@/api/shop'
import { defineStore } from 'pinia'
import type {
  ShopsResponseData,
  ShopSearch,
  ShopResponseData,
  ShopNamesResponse,
  ShopDetailsResponse,
  ShopDetailData,
} from '@/api/shop/type'
import { SellShopState } from './types/types'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'

let $router = useRouter()

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
      shopPage: [],
      scrollTop: 0,
      shopDrawer: false,
    }
  },
  actions: {
    // async setShopList() {
    //   const res: ShopsResponseData = await getShopList()
    //   if (res.code === 200) {
    //     this.shopArr = res.data
    //   } else {
    //     return Promise.reject(new Error(res.message))
    //   }
    // },
    // async getShopList() {
    //   if(this.shopArr.length===0){
    //     this.setShopList
    //   }
    // },
    async getSellShop(shopId: number) {
      if (isNaN(shopId)) {
        if (this.shopNames.length === 0) {
          await this.getShopItem()
        }
        shopId = this.shopNames[0].id
      }
      let res: ShopDetailsResponse = await getSellShop(shopId)

      console.log("**********let res: ShopDetailsResponse*******", res.data)
      if (res.code === 200) {
        this.shop = res.data
      } else {
        ElMessage({
          type: 'error',
          message: '搜尋失败',
        })
      }
    },
    async deleteSellProduct(shopId: number) { },
    async getSellShopThisId() {
      if (this.shopId === 0) {
        if (this.shopNames.length === 0) {
          await this.getShopItem()
        }
        this.shopId = this.shopNames[0].id
      }
      let res: ShopDetailsResponse = await getSellShop(this.shopId)

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
      let userStore = useUserStore()
      if (userStore.account) {
        let res: ShopNamesResponse = await getShopNames()
        if (res.code === 200) {
          if (res.data.length === 0) {
            $router.push('/')
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
      this.shopPage = []

    },

    // async goRoute() {
    //   if(this.shopId===0){
    //     if(this.shopNames.length===0){
    //       let a=await this.getShopItem()
    //       if( !a || a.length===0){
    //          $router.push("/")
    //       }
    //     }else{
    //       this.shopId=this.shopNames[0].id
    //     }
    //   }
    //   // $router.push()
    // },
  },
  getters: {},
})

export default useSellShopStore
