<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  GetOrderPageResponse,
  Order,
  OrderDetail,
  OrderPageResponse,
  Orders,
} from '@/api/order/type'
import { reqGetOrderByShop, reqPutOrderByShop } from '@/api/order'
import { ElMessage, ElTable } from 'element-plus/lib/components/index.js'

import orderPendingModal from './orderPendingModal.vue'

let $route = useRoute()

let shopId: number = parseInt($route.params.shopId as string)

let pageNo = ref<number>(1)

let pageSize = ref<number>(10)

let total = ref<number>(0)

const orderPendingVisible = ref<boolean>(false)

const order = ref<Orders>([])
const orderPageResponse = ref<OrderPageResponse>()

const getOrder = async () => {
  let res: GetOrderPageResponse = await reqGetOrderByShop(
    shopId,
    2,
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
  console.log(shopId, toStatus, orderIdList)
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
const $colorLight9 = 'rgb(0 255 0 / 5%)'
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
  console.log('val', val)
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
const groupedData = ref<GroupedData[]>()
// const transformedData: GroupedData[]
// type GroupedData = {
//   productId: number
//   productName: string
//   productTotalQty: number
//   item: OrderDetail[]
// }
const getMealGroup = (order: Order) => {
  console.log('///////////////////', order)

  orderPendingVisible.value = true
  const transformedData: GroupedData[] = []

  let jsonData = JSON.parse(JSON.stringify(order))
  jsonData.orderDetails.forEach((item) => {
    const existingItem = transformedData.find(
      (el) =>
        el.productId === item.productId && el.productName === item.productName,
    )
    if (existingItem) {
      existingItem.productTotalQty += item.qty
      if (item.remark === '') {
        const existingOrder = existingItem.item.find((el) => el.remark === '')
        if (existingOrder) {
          existingOrder.qty += item.qty
        } else {
          existingItem.item.push(item)
        }
      } else {
        existingItem.item.push(item)
      }
    } else {
      transformedData.push({
        productId: item.productId,
        productName: item.productName,
        productTotalQty: item.qty,
        item: [item],
      })
    }
  })

  console.log(transformedData)
  groupedData.value = transformedData
}

//----------------------------------------------------------------------
// const getMealGroup = (order: Order) => {
//   console.log('///////////////////', order)
//   orderPendingVisible.value = true
//   groupedData.value = order.orderDetails.reduce(
//     (acc: GroupedData[], item: OrderDetail) => {
//       const existingItem = acc.find(
//         (el) =>
//           el.productId === item.productId &&
//           el.productName === item.productName &&
//           el.item.every((e) => e.remark === '' || item.remark === ''),
//       )
//       if (existingItem) {
//         const index = acc.findIndex(
//           (el) =>
//             el.productId === item.productId &&
//             el.productName === item.productName &&
//             el.item.every((e) => e.remark === '' || item.remark === ''),
//         )
//         existingItem.productTotalQty += item.qty
//         if (item.remark === '') {
//           acc[index].item = acc[index].item.map((i) =>
//             i.remark === '' ? { ...i, qty: i.qty + item.qty } : i,
//           )
//         } else {
//           existingItem.item.push(item)
//         }
//       } else {
//         acc.push({
//           productId: item.productId,
//           productName: item.productName,
//           productTotalQty: item.qty,
//           item: [item],
//         })
//       }
//       return acc
//     },
//     [],
//   )

//   // console.log(transformedData)
// }

// const getMealGroup = (order: Order) => {
//   orderPendingVisible.value = true
//   const data: Record<string, OrderDetail[]> = order.orderDetails.reduce(
//     (acc: { [key: number]: OrderDetail[] }, meal: OrderDetail) => {
//       const item = JSON.parse(JSON.stringify(meal))
//       if (!acc[item.productId]) {
//         acc[item.productId] = []
//       }
//       if (acc[item.productId].length === 0 || item.remark !== '') {
//         // console.log('item.remark !==', item.remark)
//         acc[item.productId].push(item)
//       } else {
//         const foundItem = acc[item.productId].findIndex((v) => v.remark === '')
//         // console.log("foundItem",foundItem )
//         if (foundItem < 0) {
//           // console.log("foundItem",foundItem )
//           acc[item.productId].push(item)
//         } else {
//           acc[item.productId][foundItem].qty =
//             acc[item.productId][foundItem].qty + item.qty
//         }
//       }
//       return acc
//     },
//     {},
//   )

//   // console.log("aaaaaaaaaaa",a)
//   //   let b=Object.values(a);

//   //   // console.log("aaaaaaaaaaaObject.values(a);",Object.values(a))

//   //   b.forEach(group => {
//   //     group.sort((a, b) => a.productId - b.productId);
//   // });

//   //   console.log("aaaaaaaaaaaObject.values(a);",b)

//   // groupedData.value= Object.keys(a)
//   //   .sort((a, b) => parseInt(a) - parseInt(b))
//   //   .reduce((acc, key) => {
//   //     return acc.concat(a[key].map((item) => ({ ...item, productId: parseInt(key) })));
//   //   }, []);

//   console.log('aaaaaaaaaaaObject.values(a);', data)
//   groupedData.value = Object.keys(data)
//     .sort((a, b) => parseInt(a) - parseInt(b))
//     .reduce((acc: OrderDetail[], key: string) => {
//       const currentData = data[key].map((item) => ({
//         ...item,
//         productId: parseInt(key),
//       }))
//       return acc.concat(currentData)
//     }, [])
//   console.log('aaaaaaaaaaaObject.values(a);', groupedData.value )
// }
import moment from 'moment'
import { ResultResponse } from '@/api/type'
import { GroupedData } from './orderPending'
const formatDate = (row: any, column: any) => {
  const date = row.takeTime
  let formattedDate
  if (column.columnKey === 'date') {
    formattedDate = moment(date).format('YYYY-MM-DD')
  }
  if (column.columnKey === 'time') {
    formattedDate = moment(date).format('HH:mm:ss')
  }
  // 使用您想要的日期格式
  return formattedDate
}
</script>

<template>
  <el-card style="margin: 0px m-20px">
    <el-button
      type="success"
      size="default"
      @click="setRejectOrders(12)"
      :disabled="multipleSelection.length ? false : true"
    >
      批量餐點分類
    </el-button>
    <el-table
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
              <el-table-column label="id" prop="orderDetailId" align="center" />
              <el-table-column label="id" prop="productId" align="center" />
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
          <el-button size="small" @click="getMealGroup(row)" type="success">
            餐點分類
          </el-button>
          <el-popconfirm
            :title="`${row.orderId}訂單確定已完成嗎？`"
            width="260px"
            @confirm="setOrder(row.orderId, 99)"
          >
            <template #reference>
              <!-- <el-button type="danger" size="small" icon="Delete" @click="deleteProduct(row.id)"  > -->
              <el-button type="primary" size="small" icon="CircleCloseFilled">
                完成
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
  <orderPendingModal
    v-model:orderPendingVisible="orderPendingVisible"
    :groupedData="groupedData"
  ></orderPendingModal>
</template>

<style lang="scss" scoped>
.el-card {
  // background-color: #ff85855e;
}

// .expand-row {
//   background-color: rgba(155, 155, 155, 0.05);
// }

// .expand-table {
//   background-color: rgba(155, 155, 155, 0.05);
// }
</style>
