<template>
  <!-- <el-header style="text-align: right; font-size: 12px"> -->
  <el-header>
    <div class="toolbar">
      <div class="toolbar_left">
        <BreadCrumb />
      </div>
      <div class="toolbar_order" v-if="sellShopStore.shopNames.length > 0">
        <Order :isToolbarVisibleAll="isBreakpointSM"></Order>
      </div>
      <div class="toolbar_right">
        <Setting :isToolbarVisibleAll="isBreakpointSM" />
      </div>
      <div class="" v-if="!isBreakpointSM && userStore.username">
        <OrderSetting />
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
import OrderSetting from './orderSetting/index.vue'
import Order from './order/index.vue'
import useSellShopStore from '@/store/modules/sellShop'
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()

// import useSellShopStore from '@/store/modules/sellShop'
let sellShopStore = useSellShopStore()

const getItem = async () => {
  await sellShopStore.getShopItem()
}
onMounted(() => {
  getItem()
})

defineProps(['scene'])

import { isBreakpointSM } from '@/utils/windowSize'
</script>
<style lang="scss" scoped>
.toolbar {
  position: sticky;
  top: 0; /* 元素固定的位置，這裡是頂部 */
  // background-color: #da680b00;
  z-index: 100; /* 可選的，如果有其他元素重疊時可以使用 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 30px;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);

  .toolbar_left {
    display: flex;
    align-items: center;
    // margin-left: 10px;
    height: 100%;
  }

  .toolbar_order {
    display: inline-block;
    height: 100%;
  }
  .toolbar_right {
    display: flex;
    align-items: center;
    height: 100%;
  }

  @media (max-width: $breakpoint-md) {
    padding: 0;

    display: flex;
    justify-content: space-between;
    .toolbar_left {
      margin-right: auto;
    }
    .toolbar_right {
      margin-right: 10px;
    }
  }

  @media (max-width: $breakpoint-xs) {
    padding: 0;
  }
}
</style>
