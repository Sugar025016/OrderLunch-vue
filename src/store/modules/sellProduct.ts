import {
  reqAddOrUpdateSellProduct,
  reqDeleteSellProducts,
  reqGetSellProducts,
} from '@/api/sellProduct'
import { defineStore } from 'pinia'
import type {
  ResponseBoolean,
  ResponseProductList,
  SellProduct,
} from '@/api/sellProduct/type'
import { SellProductState, ShopState } from './types/types'

const useSellProductStore = defineStore('sellProductStore', {
  state: (): SellProductState => {
    return {
      products: [],
      shopId: 0,
    }
  },
  actions: {
    async setSellProductStoreShopId(shooId: number) {
      this.shopId = shooId
    },

    async getSellProduct() {
      let res: ResponseProductList = await reqGetSellProducts(this.shopId)
      if (res.code === 200) {
        this.products = res.data
        return this.products
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})

export default useSellProductStore
