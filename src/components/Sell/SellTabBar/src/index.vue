<script setup lang="ts">
import BreadCrumb from './breadcrumb.vue'

import order from '@/components/Buy/BuyTabBar/src/order/index.vue'
import Setting from '@/components/Buy/BuyTabBar/src/setting/index.vue'


defineProps(['scene'])
</script>

<template>
  <el-header style="text-align: right; font-size: 12px">
    <div class="toolbar">
      <div class="toolbar_left">
        <BreadCrumb />
        444
      </div>
      <div class="toolbar_order">
        <order></order>
      </div>
      <div class="toolbar_right">
        <Setting />
      </div>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.toolbar {
  position: sticky;
  top: 0; /* 元素固定的位置，這裡是頂部 */
  // background-color: #f1f1f1; /* 元素的背景色 */
  z-index: 100; /* 可選的，如果有其他元素重疊時可以使用 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  .toolbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .toolbar_order {

    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .toolbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
