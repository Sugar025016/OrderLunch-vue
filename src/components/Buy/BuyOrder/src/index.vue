<script setup lang="ts">
import rwdBody from '@/components/layout/rwdBody/index.vue'

import { reqGetOrder } from '@/api/order'
import {
  GetOrderPageResponse,
  Order,
  OrderPageResponse,
  Orders,
} from '@/api/order/type'

import { ElMessage } from 'element-plus/lib/components/index.js'

import { onMounted, ref } from 'vue'
import { formatDate } from '@/utils/time'
const activeTab = ref(0)
interface Tab {
  label: string
  content: string
}
const tabs: Tab[] = [
  { label: '我的訂單', content: 'Content 1' },
  { label: '過去的訂單', content: 'Content 2' },
]
const changeTab = (index: number) => {
  activeTab.value = index
}
const page = ref<number>(1)

const order = ref<Orders>([])
const orderPageResponse = ref<OrderPageResponse>()

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: Order
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const $color = '#fd7e14'
const cellStyle = ({ row }: any) => {
  const style = ref({
    color: '',
    background: '',
  })
  if (row.status <= 90) {
    style.value.color = $color
  }

  return style.value
}

const loading = ref(false)
const getOrder = async (page: number) => {
  let res: GetOrderPageResponse = await reqGetOrder(page)
  if (res.code === 200) {
    orderPageResponse.value = res.data
    order.value.push(...res.data.content)
    // console.log('/////////////', orderPageResponse.value)
  } else {
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}

window.addEventListener('scroll', async () => {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200
  ) {
    console.log('頁面滾動到了底部')
    // 觸發加載更多數據的方法
    if (
      orderPageResponse.value?.totalPages &&
      page.value < orderPageResponse.value?.totalPages &&
      !loading.value
    ) {
      let to = window.innerHeight + window.scrollY
      loading.value = true
      page.value = page.value + 1
      await setTimeout(() => {
        getOrder(page.value)
        window.scrollTo({ top: to, behavior: 'instant' })
        loading.value = false
      }, 1400)
      await getOrder(page.value)
    }
  }
})

onMounted(() => {
  getOrder(page.value)
})
</script>

<template>
  <div class="buyOrder">
    <rwdBody>
      <template #slotName>
        <h1>我的訂單</h1>

        <div class="tabs">
          <div class="tabs-content">
            <el-table
              :data="order"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              :cell-style="cellStyle"
            >
              <el-table-column label="圖片" prop="imgUrl" align="center">
                <template #="{ row, $index }">
                  <el-image
                    :src="row.imgUrl"
                    alt=""
                    style="width: 130px; height: 100px"
                    lazy
                  />
                </template>
              </el-table-column>
              <el-table-column prop="shopName" label="店家" width="100" />
              <el-table-column prop="orderId" label="訂單編號" width="100" />
              <el-table-column prop="statusChinese" label="狀態" />
              <!-- <el-table-column prop="takeTime" label="取餐時間" /> -->
              <el-table-column
                prop="takeTime"
                label="取餐日期"
                width="100"
                max-width="180"
                align="center"
                column-key="date"
                :formatter="formatDate"
              />
              <el-table-column
                prop="takeTime"
                label="取餐時間"
                width="100"
                max-width="180"
                align="center"
                column-key="time"
                :formatter="formatDate"
              />
              <el-table-column prop="totalPrise" label="金額" />
              <el-table-column
                prop="remark"
                label="備註"
                :cell-style="cellStyle"
              />
            </el-table>
          </div>
          <div v-if="loading" class="loading" v-loading="loading"></div>
        </div>
      </template>
    </rwdBody>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/styles/bootstrap.scss';

$table-cell-padding-y: 1.5rem; //
$table-border-color: rgb(155, 155, 155); //
$table-border-color: rgba(155, 155, 155, 0.548); //

// @import 'node_modules/bootstrap/scss/_tables.scss';
.example-showcase .el-loading-mask {
  z-index: 9;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.buyOrder {
  h1 {
    font-size: 36px;
    margin: 0 10px 10px 10px;
    color: $color;
  }
  .tabs {
    width: 100%;
    .tabs-header {
      display: flex;
      margin: 20px 0 0 0;
      color: #636262;
      border-bottom: 1px solid #63626236;
      white-space: nowrap;
      overflow-x: auto;
      div {
        position: relative;
        padding: 0 32px 0 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .tab-label {
        display: inline-block;
        position: relative;
        padding: 16px 0;
        z-index: 1;
      }

      .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: transparent;
        transition: background-color 0.2s;
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        border-bottom: 3px solid rgba(0, 0, 0, 0);
      }
      div:hover .underline {
        border-bottom: 3px solid $color;
      }
      .active {
        color: #000000;
        border-bottom: 3px solid $color;
      }
      div:hover {
        color: #000000;
      }
      .tabs-content {
        font-size: 30px;
        margin: 10px;
        border-bottom: #636262;
        display: flex;
        align-items: center;
        .table > tbody {
          background-color: aquamarine;
        }
        .table {
          background-color: aquamarine;
          tbody {
            background-color: aquamarine;
            tr td:first-child {
              margin-top: 10px;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    .loading {
      height: 50px;
      margin-top: 20px;
    }
  }
}
</style>
