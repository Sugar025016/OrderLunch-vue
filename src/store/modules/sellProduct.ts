import { reqGetSellProducts } from '@/api/sellProduct'
import { defineStore } from 'pinia'
import type { ResponseProductList } from '@/api/sellProduct/type'
import { SellProductState } from './types/types'

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
      const res: ResponseProductList = await reqGetSellProducts(this.shopId)
      if (res.status === 200) {
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
