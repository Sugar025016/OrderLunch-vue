<script setup lang="ts">
import {  ref } from 'vue'
import { GroupedData } from './orderPending'

const props = defineProps({
  orderPendingVisible: Boolean,
  groupedData: Object as () => GroupedData[],
})

const visible = ref(props.orderPendingVisible)

const $emit = defineEmits(['update:orderPendingVisible'])

// 定义关闭对话框的方法
const handleClose = () => {
  props.orderPendingVisible
  $emit('update:orderPendingVisible', (visible.value = false))
}

const accordion = ref(true)
</script>

<template>
  
  <el-dialog
    v-model="props.orderPendingVisible"
    title="餐點分類"
    :before-close="handleClose"
  >
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h3 :id="titleId" :class="titleClass">餐點分類</h3>

        <el-form-item label="多開">
          <el-switch v-model="accordion" />
        </el-form-item>
      </div>
    </template>
    <el-collapse :accordion="!accordion">
      <div v-for="grouped in props.groupedData">
        <el-collapse-item :name="grouped.productId">
          <template #title>
            <div class="title">
              <div class="title-name">名稱：{{ grouped.productName }}</div>
              <div class="title-total">總數：{{ grouped.productTotalQty }}</div>
            </div>
          </template>
          <div item v-for="detail in grouped.item" class="detail">
            <div class="detail-qty">數量：{{ detail.qty }}</div>
            <div class="detail-remark">備註：{{ detail.remark }}</div>
          </div>
          <div class="hr">
            <hr />
          </div>

          <div item class="detail">
            <div class="detail-total">總數：{{ grouped.productTotalQty }}</div>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-dialog__title {
  color: $color;
}

.my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 30px;
  font-size: 18px;
  h3 {
    font-size: 24px;
  }
  .el-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 0px;
    margin: 0 20px;
    label {
      color: $color;
    }
  }
}

.el-collapse {
  font-size: 120px;
  .title {
    // color: $color;
    font-size: 16px;
    width: 100%;
    margin: 0 30px 0 20px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    grid-gap: 30px;
    .title-name {
      width: 150px;
    }
  }
  .el-collapse-item__content {
    .detail {
      color: $color;
      font-size: 16px;
      width: 100%;
      margin: 0 50px 0 50px;
      display: flex;
      .detail-qty {
        width: 90px;
        min-width: 90px;
      }
      .detail-remark {
        width: calc(100% - 150px);
        word-wrap: break-word;
      }
    }

    .hr {
      width: 100px;
      margin: 0 30px;
      hr {
        border-color: $color;
        background-color: aqua;

        position: static;
        left: 0;
        width: 110px;
      }
    }
  }
}
</style>
