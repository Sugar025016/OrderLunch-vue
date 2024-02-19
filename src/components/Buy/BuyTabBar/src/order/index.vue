<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useSellShopStore from '@/store/modules/sellShop'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { GetOrderNewResponse, Orders } from '@/api/order/type'

import SellOrderModal from './sellOrderModal/index.vue'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { reqGetOrderNew } from '@/api/order'

let sellShopStore = useSellShopStore()
let sellOrderModalOpen = ref(false)
let userStore = useUserStore()

let $router = useRouter()
let $route = useRoute()

let orderNew = ref<Orders>([])

const getOrderNew = async () => {
  if (userStore.token != '') {
    let res: GetOrderNewResponse = await reqGetOrderNew()
    if (res.code === 200) {
      orderNew.value = res.data
    } else {
      ElMessage({
        type: 'error',
        message: '搜尋失败',
      })
    }
  }
}

const goRoute = async (shopId: number, shopName: string) => {
  $route.meta.shopId = shopId.toString()
  sellShopStore.shopId = shopId
  $route.meta.title = shopName

  console.log("router.currentRoute.value.params.id",$router.currentRoute.value.params.id)
  console.log("shopId：：：",shopId)
  $router.push(`/sell/${shopId}/Shop`)
}
const addShop = async () => {
  console.log('開店')
  $router.push('/Register/shop')
}

onMounted(() => {
  getSellShop()
  const timer = setInterval(() => {
    getOrderNew()
  }, 60000)
  getOrderNew()
  onBeforeUnmount(() => {
    clearInterval(timer)
  })
})
const openSellOrderModal = () => {
  sellOrderModalOpen.value = true
}

watch(
  () => sellShopStore.shopNames,
  (newOrders) => {
    // 在这里执行你的逻辑，更新 shopNameSet
    console.log('sellShopStore.shopNames', newOrders)
  },
)

let shopId: number
shopId = Number($router.currentRoute.value.params.shopId as unknown)
watch(
  () => $router.currentRoute.value.params.shopId,
  (newId, oldId) => {
    console.log('路由参数变化了：', newId)
    shopId = Number($router.currentRoute.value.params.shopId as unknown)
    getSellShop()
    // 在这里调用你想要执行的方法
  },
)
const getSellShop = async () => {
  console.log('shopId', shopId)
  await sellShopStore.getSellShop(shopId)
  $route.meta.title = sellShopStore.shop.name
}

</script>
<template>
  <div class="order">
    <div class="order-text">
      <div class="link">
        <el-link :underline="false" @click="openSellOrderModal">
          <Shop class="icon list shopOrder" />
          <span
            class="cartQuantity text-white bg-warning count shopOrder-count"
          >
            {{ orderNew.length }}
          </span>
        </el-link>
      </div>
      <el-dropdown v-if="sellShopStore.shopNames.length > 1">
        <span class="el-dropdown-link" style="cursor: pointer">
          商店
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
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item @click="addShop">
              <!-- <router-link :to="'/Register/shop'" class="router-link"> -->
                新增餐廳
              <!-- </router-link> -->
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div v-if="sellShopStore.shopNames.length == 1">
        <span class="el-dropdown-link" style="cursor: pointer">
          {{ sellShopStore.shopNames[0].name }}
        </span>
      </div>
    </div>
  </div>
  <SellOrderModal
    v-model:scheduleVisible="sellOrderModalOpen"
    :orderNew="orderNew"
    :getOrderNew="getOrderNew"
  ></SellOrderModal>
</template>

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
    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      .cartQuantity {
        position: relative;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 10px;
        top: -10px;
      }

      .shopOrder {
        // color: rgb(61, 144, 253);
        color: rgb(255, 105, 105);
      }
      .shopOrder-count {
        border-radius: 50%;
        // background-color: rgb(61, 144, 253);
        background-color: rgb(255, 105, 105);
      }
      .text-white {
        font-size: 18px;
        color: white;
      }
    }
    .shop-one {
      margin: 0 10px;
      color: $color;
      span {
        font-size: 16px;
        font-weight: 800;
      }
    }
  }

  .order-text {
    display: flex;
    align-items: center;
    justify-content: center;
    // margin: 11px 10px 7px 10px;
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
