<template>
  <el-header style="text-align: right; font-size: 12px">
    <div class="toolbar">
      <div class="toolbar_left">
        <BreadCrumb />
      </div>
      <div class="toolbar_order" v-if="sellShopStore.shopNames.length > 0">
        <order></order>
      </div>
      <div class="toolbar_right">
        <Setting />
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
import order from './order/index.vue'
import useSellShopStore from '@/store/modules/sellShop'
import { onMounted } from 'vue';

// import useSellShopStore from '@/store/modules/sellShop'
let sellShopStore = useSellShopStore()

const getItem = async () => {
  await sellShopStore.getShopItem()
}
onMounted(() => {
  getItem()
})
// let sellShopStore = useSellShopStore()


defineProps(['scene'])
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
    margin-left: 10px;
  }

  .toolbar_order {
    // width: 100px;
    display: inline-block;
    // display: inline-flex;

    // margin: auto;淤ㄝ
  }
  .toolbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
