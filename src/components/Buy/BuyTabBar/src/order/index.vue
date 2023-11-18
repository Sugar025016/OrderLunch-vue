<template>
  <div class="order">
    <div class="order-text">
      <!-- <a>訂單</a> -->

      <router-link :to="'/BuyOrder'" class="link">訂單</router-link>
    </div>
    <div class="order-text more">
      <!-- <span>更多</span> -->
      <el-dropdown class="car">
        <span class="el-dropdown-link" style="cursor: pointer">
          更多
          <!-- {{ userStore.username }} -->
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in shopStore.shopNames"
              @click="goRoute(item.id)"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import useShopStore from '@/store/modules/shop'
import useSellShopStore from '@/store/modules/sellShop'
import { useRouter, useRoute } from 'vue-router'
import { ShopNames } from '@/api/shop/type'
import { onMounted, ref } from 'vue'

let shopStore = useShopStore()
let sellShopStore = useSellShopStore()
const shopNameItem = ref<ShopNames>([])

let $router = useRouter()
let $route = useRoute()
// const goRoute = async (path: string, shopId: number) => {
//   $route.params.id=sellShopStore.shopId.toString();
//   sellShopStore.shopId = shopId
//   await sellShopStore.getSellShop(shopId)
//   $router.push(path+ shopId)
//
//   // $router.push(path )
// }

const goRoute = async (shopId: number) => {
  $route.meta.shopId = shopId.toString()

  await sellShopStore.getSellShop(shopId)
  sellShopStore.shopId = shopId
  $router.push(`/sell/${shopId}/Shop`)
}
const getItem = async () => {
  await shopStore.getShopItem()
}
onMounted(() => {
  getItem()
})
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  .order-text {
    margin: 10px;
    font-size: 15px;
    a {
      color: #000;
      text-decoration: none;
    }
  }
}
</style>
