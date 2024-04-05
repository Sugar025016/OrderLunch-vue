<template>
  <!-- <el-header style="text-align: right; font-size: 12px"> -->
  <el-header>
    <div class="toolbar">
      <div class="toolbar_left">
        <BreadCrumb />
      </div>
      <div class="toolbar_order" v-if="sellShopStore.shopNames.length > 0">
        <Order :isToolbarVisibleAll="isToolbarVisibleAll"></Order>
      </div>
      <div class="toolbar_right">
        <Setting :isToolbarVisibleAll="isToolbarVisibleAll" />
      </div>
      <div class="" v-if="!isToolbarVisibleAll">
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
import { computed, onMounted } from 'vue'

// import useSellShopStore from '@/store/modules/sellShop'
let sellShopStore = useSellShopStore()

const getItem = async () => {
  await sellShopStore.getShopItem()
}
onMounted(() => {
  getItem()
})

defineProps(['scene'])

import { useWindowSize } from '@vueuse/core'

// 使用 VueUse 的 useWindowSize 来获取窗口大小
const { width } = useWindowSize()

// 根据窗口宽度决定是否显示工具栏
const isToolbarVisibleAll = computed(() => {
  // 这里可以根据实际情况调整断点的值
  return width.value >= 720 // 例如，当窗口宽度大于等于 600px 时显示工具栏
})
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
