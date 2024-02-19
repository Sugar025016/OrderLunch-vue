<script setup lang="ts">
import BreadCrumb from './breadcrumb.vue'
// import Setting from './setting/index.vue'
// import order from './order/index.vue'
import { onMounted, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import order from '@/components/Buy/BuyTabBar/src/order/index.vue'
import Setting from '@/components/Buy/BuyTabBar/src/setting/index.vue'
let userStore = useUserStore()
// import useCategoryStore from '@/store/modules/category'

// let categoryStore = useCategoryStore()
//
onMounted(() => {
  getC1()
})

const getC1 = async () => {
  // categoryStore.getC1()
}

// const handler = (n: number) => {
//   if (n === 1) {
//     categoryStore.c2Id = ''
//     categoryStore.c3Id = ''
//     categoryStore.c3Arr = []
//     categoryStore.getC2()
//   } else if (n === 2) {
//     categoryStore.c3Id = ''
//     categoryStore.getC3()
//   }
// }

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
  // padding: 0 10px;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  .toolbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .toolbar_order {
    // width: 100px;
    // display: inline-block;
    // display: inline-flex;

    // margin: auto;淤ㄝ
    // height: auto;
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
