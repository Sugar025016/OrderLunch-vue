<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  GetOrderPageResponse,
  OrderPageResponse,
  Orders,
} from '@/api/order/type'
import { reqGetOrderByShop } from '@/api/order'
import { ElMessage } from 'element-plus/lib/components/index.js'

let $route = useRoute()

let shopId: number = parseInt($route.params.shopId as string)

let pageNo = ref<number>(1)

let pageSize = ref<number>(10)

let total = ref<number>(0)

const order = ref<Orders>([])
const orderPageResponse = ref<OrderPageResponse>()
const page = ref(1)
const getOrder = async () => {
  let res: GetOrderPageResponse = await reqGetOrderByShop(
    shopId,
    0,
    pageSize.value,
    pageNo.value,
  )
  if (res.code === 200) {
    total.value = res.data.totalElements
    orderPageResponse.value = res.data
    order.value = res.data.content
  } else {
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}
onMounted(() => {
  getOrder()
})

const $color = '#fd7e14'
// const $colorLight9 = '#fff1e6'
const $colorLight9 = 'rgb(0 0 255 / 5%)'
const cellStyle = () => {
  const style = ref({
    color: '',
    background: '',
    border: '',
  })

  style.value.background = $colorLight9
  style.value.border = '1px solid black'
  return style.value
}

const parentBorder = ref(false)
const childBorder = ref(false)
</script>

<template>
  <el-card style="margin: 0px m-20px">
    <el-table
      height="760"
      style="margin: 0 0 10px 0; width: 100%"
      :data="order"
      :border="parentBorder"
      :row-style="cellStyle()"
    >
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column type="expand">
        <template #default="props">
          <div m="4" style="margin: 10px 40px" class="expand-row">
            <el-table
              :data="props.row.orderDetails"
              :border="childBorder"
              class="expand-table"
            >
              <el-table-column label="餐點" prop="productName" align="center" />
              <el-table-column label="數量" prop="qty" align="center" />
              <el-table-column label="備註" prop="remark" align="center" />
            </el-table>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="statusChinese"
        label="狀態"
        width="100"
        align="center"
      />
      <el-table-column
        prop="userName"
        label="訂購人"
        width="100"
        align="center"
      />
      <el-table-column
        prop="orderId"
        label="訂單編號"
        width="110"
        align="center"
        sortable
      />
      <el-table-column
        prop="takeTime"
        label="取餐時間"
        width="180"
        max-width="100"
        align="center"
      />
      <el-table-column
        prop="totalPrise"
        label="評價"
        width="160"
        align="center"
      />
      <el-table-column
        prop="totalPrise"
        label="金額"
        width="60"
        align="center"
      />
      <el-table-column label="地址">
        <template #default="{ row }">
          {{ row.address.city }} - {{ row.address.area }} -
          {{ row.address.detail }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="備註" />
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="getOrder"
      @size-change="getOrder"
    />
  </el-card>
  <SellProductDrawer ref="SellProductDrawerRef" />
</template>

<style lang="scss" scoped>
.el-card {
  // background-color: #fff1e6;
}

.expand-row {
  background-color: rgba(155, 155, 155, 0.05);
}

.expand-table {
  background-color: rgba(155, 155, 155, 0.05);
}
</style>
