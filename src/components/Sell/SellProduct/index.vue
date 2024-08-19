<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import useSellProductStore from '@/store/modules/sellProduct'
import { SellProduct, SellProductList } from '@/api/sellProduct/type'
import SellProductDrawer from './SellProductDrawer/src/index.vue'
import Search from '@/components/SharedComponents/search.vue'

let $route = useRoute()

let sellProductStore = useSellProductStore()

const products = ref<SellProductList>([])

let shopId: number = parseInt($route.params.shopId as string)

onMounted(async () => {
  await setShopId()
  getProducts()
})

const setShopId = async () => {
  if (shopId) {
    await sellProductStore.setSellProductStoreShopId(shopId)
  }
}

const getProducts = async () => {
  if (shopId) {
    await sellProductStore.getSellProduct()
  }
  if (sellProductStore.products.length > 0) {
    products.value = sellProductStore.products
  } else {
    addProduct()
  }
}

// drawer
const SellProductDrawerRef = ref<typeof SellProductDrawer>()

const updateProduct = (product: SellProduct) => {
  SellProductDrawerRef.value?.updateProduct(product)
}

const addProduct = () => {
  SellProductDrawerRef.value?.addProduct()
}

// search
const getSearchResult = (sellProductList: SellProductList) => {
  products.value = sellProductList
}
</script>

<template>
  <el-card style="height: 80px">
    <Search
      v-on:search-result="getSearchResult"
      :products="sellProductStore.products"
    ></Search>
  </el-card>

  <el-card style="margin: 10px 0">
    <div class="products-body">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="新增餐點"
        placement="bottom-end"
      >
        <def-product-card :add="true" @click="addProduct()"></def-product-card>
      </el-tooltip>

      <component v-for="product in products" :key="product.id">
        <def-product-card
          :change="true"
          :product="product"
          :setting="true"
          @click="updateProduct(product)"
        ></def-product-card>
      </component>
    </div>
  </el-card>
  <SellProductDrawer ref="SellProductDrawerRef" />
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import 'node_modules/bootstrap/scss/buttons';
@import 'node_modules/bootstrap/scss/_forms.scss';

.products-body {
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;

  .productCard {
    max-width: 600px;
    margin: auto;
  }
  @media (min-width: $breakpoint-xs) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-xxl) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
