<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  GetOrderPageResponse,
  Order,
  OrderPageResponse,
  Orders,
} from '@/api/order/type'
import { reqGetOrderByShop, reqPutOrderByShop } from '@/api/order'
import { ElMessage, ElTable } from 'element-plus/lib/components/index.js'

let $route = useRoute()

let shopId: number = parseInt($route.params.shopId as string)

let pageNo = ref<number>(1)

let pageSize = ref<number>(10)

let total = ref<number>(0)

const order = ref<Orders>([])
const orderPageResponse = ref<OrderPageResponse>()

const getOrder = async () => {
  let res: GetOrderPageResponse = await reqGetOrderByShop(
    shopId,
    1,
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

const putOrderByShop = async (
  shopId: number,
  toStatus: number,
  orderIdList: number[],
) => {
  let res: ResultResponse = await reqPutOrderByShop(
    shopId,
    toStatus,
    orderIdList,
  )

  if (res.code === 200) {
    orderIds.value = []
    getOrder()
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

// style
const $colorLight9 = 'rgb(255 0 0 / 5%)'
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

// button 事件
const parentBorder = ref(false)
const childBorder = ref(false)
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Order[]>([])
const orderIds = ref<number[]>([])

const handleSelectionChange = (val: Order[]) => {
  multipleSelection.value = val
}

const setRejectOrders = (status: number) => {
  multipleSelection.value.forEach((v) => orderIds.value.push(v.orderId))
  putOrderByShop(shopId, status, orderIds.value)
  multipleSelection.value = []
  multipleTableRef.value!.clearSelection()
}

const setOrder = (orderId: number, status: number) => {
  orderIds.value.push(orderId)
  putOrderByShop(shopId, status, orderIds.value)
}

import { ResultResponse } from '@/api/type'
import { formatDate } from '@/utils/time'

</script>

<template>
  <el-card style="margin: 0px m-20px">
    <el-button
      type="primary"
      size="default"
      @click="setRejectOrders(12)"
      :disabled="multipleSelection.length ? false : true"
    >
      批量接單
    </el-button>
    <el-popconfirm
      :title="`你确定拒接這些訂單嗎？`"
      width="260px"
      @confirm="setRejectOrders(93)"
    >
      <template #reference>
        <el-button
          type="danger"
          size="default"
          :disabled="multipleSelection.length ? false : true"
        >
          批量拒接
        </el-button>
      </template>
    </el-popconfirm>
    <el-table
      height="718"
      ref="multipleTableRef"
      style="margin: 10px 0; width: 100%"
      :data="order"
      :border="parentBorder"
      :row-style="cellStyle()"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column
        label="#"
        align="center"
        type="index"
        width="40"
      ></el-table-column>
      <el-table-column type="expand" width="40">
        <template #default="props">
          <div m="4" style="margin: 10px 40px" class="expand-row">
            <el-table
              :data="props.row.orderDetails"
              :border="childBorder"
              class="expand-table"
            >
              <el-table-column
                label="#"
                align="center"
                type="index"
              ></el-table-column>
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
        label="取餐日期"
        width="90"
        max-width="180"
        align="center"
        column-key="date"
        :formatter="formatDate"
      />
      <el-table-column
        prop="takeTime"
        label="取餐時間"
        width="90"
        max-width="180"
        align="center"
        column-key="time"
        :formatter="formatDate"
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
      <el-table-column label="操作" width="180px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="CircleCheckFilled"
            @click="setOrder(row.orderId, 12)"
          >
            接單
          </el-button>
          <el-popconfirm
            :title="`你确定拒接${row.userName}的訂單嗎？`"
            width="260px"
            @confirm="setOrder(row.orderId, 93)"
          >
            <template #reference>
              <!-- <el-button type="danger" size="small" icon="Delete" @click="deleteProduct(row.id)"  > -->
              <el-button type="danger" size="small" icon="CircleCloseFilled">
                拒接
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="getOrder"
      @size-change="getOrder"
    />
  </el-card>
</template>

<style lang="scss" scoped>

</style>
