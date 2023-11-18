<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import useSellProductStore from '@/store/modules/sellProduct'
import { SellProduct, SellProductList } from '@/api/sellProduct/type'

let $route = useRoute()

let sellProductStore = useSellProductStore()

const products = ref<SellProductList>([])

let shopId: number = parseInt($route.params.shopId as string)

onMounted(async () => {
  await setShopId()
  getProducts()
})

const setShopId = async () => {
  if (shopId) {
    await sellProductStore.setSellProductStoreShopId(shopId)
  }
}

const getProducts = async () => {
  if (shopId) {
    await sellProductStore.getSellProduct()
  }
  if (sellProductStore.products.length > 0) {
    products.value = sellProductStore.products
  } else {
    addProduct()
  }
}

// drawer
const SellProductDrawerRef = ref<typeof SellProductDrawer>()

const updateProduct = (product: SellProduct) => {
  SellProductDrawerRef.value?.updateProduct(product)
}

const addProduct = () => {
  SellProductDrawerRef.value?.addProduct()
}

// search
const getSearchResult = (sellProductList: SellProductList) => {
  products.value = sellProductList
}
const $color = '#fd7e14'
const $colorLight9 = '#fce2cc'
const cellStyle = () => {
  // console.log('////////////////row', row)
  // console.log('////////////////column', column)
  // console.log('////////////////rowIndex', rowIndex)
  // console.log('////////////////columnIndex', columnIndex)
  const style = ref({
    color: '',
    background: '',
  })
  // if (row.status > 10) {
  style.value.color = $color
  style.value.background = $colorLight9
  // }
  // if (row.status < 10) {

  //   style.value.background='rgba(155, 155, 155, 0.05)'
  // }
  return style.value
}
// const cellStyle = ({ row, column, rowIndex, columnIndex }: TableColumnCtx) => {
//   // console.log('////////////////row', row)
//   // console.log('////////////////column', column)
//   // console.log('////////////////rowIndex', rowIndex)
//   // console.log('////////////////columnIndex', columnIndex)
//   const style = ref({
//     color: '',
//     background: '',
//   })
//   // if (row.status > 10) {
//     style.value.color = $color
//   // }
//   // if (row.status < 10) {

//   //   style.value.background='rgba(155, 155, 155, 0.05)'
//   // }
//   return style.value
// }

// const getOrder = async (page: number) => {
//   let res: GetOrderPageResponse = await reqGetOrderByShop( ,page)
//   if (res.code === 200) {
//     orderPageResponse.value = res.data
//     order.value.push(...res.data.content)
//     // console.log('/////////////', orderPageResponse.value)
//   } else {
//     ElMessage({
//       type: 'error',
//       message: '搜尋失败',
//     })
//   }
// }
// onMounted(() => {
//   getOrder(page.value)
// })
</script>

<template>
  <el-card style="margin: 10px 0">
    <el-table
      :data="order"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :cell-style="cellStyle"
      @selection-change="handleSelectionChange"
      border
    >
      <!-- <el-table-column label="圖片" prop="imgUrl" align="center">
        <template #="{ row, $index }">
          <el-image
            :src="row.imgUrl"
            alt=""
            style="width: 130px; height: 100px"
            lazy
          />
        </template>
      </el-table-column> -->
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="userName" label="訂購人" width="100" />
      <el-table-column prop="orderId" label="訂單編號" width="100" />
      <el-table-column prop="statusChinese" label="狀態" />
      <el-table-column prop="takeTime" label="取餐時間" />
      <el-table-column prop="totalPrise" label="金額" />
      <el-table-column prop="remark" label="備註" :cell-style="cellStyle" />
      <el-table-column label="操作" width="180px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateShop(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定删除${row.ShopName}`"
            width="260px"
            @confirm="deleteShop(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="getHasProduct"
      @size-change="handler"
    />
  </el-card>
  <SellProductDrawer ref="SellProductDrawerRef" />
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import 'node_modules/bootstrap/scss/buttons';
@import 'node_modules/bootstrap/scss/_forms.scss';

.products-body {
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  @media (min-width: $breakpoint-xs) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-xxl) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
