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
              v-for="item in sellShopStore.shopNames"
              @click="goRoute(item.id, item.name)"
            >
              {{ item.name }}-
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useSellShopStore from '@/store/modules/sellShop'

let userStore = useUserStore()
let sellShopStore = useSellShopStore()
const shopNameItem = ref<ShopNames>([])

import { useRouter, useRoute } from 'vue-router'
import { ShopNames } from '@/api/shop/type'
import { onMounted, ref } from 'vue'
let $router = useRouter()
let $route = useRoute()
const goRoute = async (shopId: number, shopName: string) => {
  $route.meta.shopId = shopId.toString()
  await sellShopStore.getSellShop(shopId)
  sellShopStore.shopId = shopId
  $route.meta.title = shopName
  $router.push(`/sell/${shopId}/Shop`)
}

const getItem = async () => {
  await sellShopStore.getShopItem()
}
onMounted(() => {
  getItem()
})
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .order-text {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    font-size: 15px;

    a {
      color: #333333;
      text-decoration: none;
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
    }
  }
}
</style>
