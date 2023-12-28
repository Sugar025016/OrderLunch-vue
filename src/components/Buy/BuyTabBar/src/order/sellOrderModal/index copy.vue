<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import { Order, Orders } from '@/api/order/type'
import ElMessage from 'element-plus/lib/components/message/index.js';

const props = defineProps({
  scheduleVisible: Boolean,
  orderNew: Object as () => Orders,
})

const visible = ref(props.scheduleVisible)

const $emit = defineEmits(['update:scheduleVisible'])

const handleClose = () => {
  $emit('update:scheduleVisible', (visible.value = false))
}

const getNewOrderByShop = (shopName: string, orderNew: Orders) => {
  return orderNew.filter((v) => v.shopName === shopName)
}

const chooseAll = ref<boolean>(true)
const shopNameSet = ref<Set<string>>(new Set())

// 监听 orderNew 的变化
watch(
  () => props.orderNew,
  (newOrders) => {
    // 在这里执行你的逻辑，更新 shopNameSet
    if (newOrders != null) {
      updateshopNameSet(newOrders)
    }
  },
)

// 定义一个函数来更新 shopNameSet
function updateshopNameSet(orders: Orders) {
  shopNameSet.value = new Set<string>()

  // 遍历 orders，将不同的 shopName 添加到 Set 中
  orders.forEach((order) => {
    if (order.shopName !== undefined) {
      shopNameSet.value.add(order.shopName)
    }
  })

  // 在这里可以执行其他逻辑，比如触发某个方法或发出事件
}
const multipleSelection = ref<Orders>([])
const handleSelectionChange = (val: Orders) => {
  multipleSelection.value = val
  console.log("*****///*****")
}

const delivery = ref<boolean>(true)

const loading1 = ref(false)
const beforeChange1 = () => {
  loading1.value = true
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     loading1.value = false
  //     ElMessage.success('Switch success')
  //     return resolve(true)
  //   }, 1000)
  // })
  
}
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="props.scheduleVisible"
      title="待接訂單"
      :before-close="handleClose"
    >
      <div class="modal-dialog" v-for="shopName in shopNameSet">
        <div class="shop-name" @click="">
          <span>{{ shopName }}</span>
        </div>
        <div class="modal-content">
          <div class="modal-body">
            <!-- <el-table :data="orderNew"> -->
            <el-table
              :data="getNewOrderByShop(shopName, orderNew as Orders)"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column
                property="orderId"
                label="訂單編號"
                width="100"
              />
              <el-table-column property="userName" label="訂購人" width="100" />
              <el-table-column property="orderTime" label="外送日期" />
              <el-table-column property="orderTime" label="外送時間" />
              <el-table-column property="address" label="外送地址" />
              <el-table-column property="remark" label="備註" />
            </el-table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="form-check form-switch">
          <el-form-item label="全選" size="large">
            <el-switch
              v-model="delivery"
              size="large"
              :loading="loading1"
              :before-change="beforeChange1"
            />
          </el-form-item>
        </div>
        <div class="footer-button">
          <el-button
            type="warning"
            class="btn btn-primary"
            size="large"
            data-bs-dismiss="modal"
            round
            plain
          >
            取消
          </el-button>
          <el-button
            type="warning"
            class="btn btn-primary"
            size="large"
            @click="save()"
            data-bs-dismiss="modal"
            plain
            round
          >
            確認
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    border-radius: 20px;
    width: 800px;
    // margin: 10px;
    .el-dialog__header {
      margin: 0px;
      border-bottom: 1px;
      border-style: solid;
      border-color: rgb(155, 155, 155);
      padding: 20px 20px 15px 20px;
      display: flex;
      span {
        font-size: 26px;
        margin: 10px;
        // font-weight: 900;
      }
    }

    .modal-dialog {
      margin: 0 0 50px 0;
      .shop-name {
        display: flex;
        // justify-content: center;
        align-items: center;
        margin: 0 0 10px 10px;
        font-size: 20px;
        font-weight: 700;
        .el-icon {
          margin-right: 2px;
        }
      }
      .modal-content {
        .modal-header {
          border-bottom: 2px;
          border-style: solid;
          border-color: rgb(155, 155, 155);
          button {
            margin: 10px;
          }
        }
        .modal-body {
          // border-width: 2px;
        }
      }
    }
    :last-child.modal-dialog {
      margin: 0 0 0px 0;
    }
  }

  // .dialog-footer {
  //   button:first-child {
  //     margin-right: 10px;
  //   }

  //   .el-button {
  //     margin-right: 20px;
  //     ::v-deep span {
  //       font-size: 16px;
  //       margin: 10px;
  //     }
  //   }
  // }
  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
      border-radius: 20px;
      border: 0;
      font-size: 18px;
      color: $color;
    }

    .btn:hover {
      background-color: $color;
      color: white;
    }
    .count {
      .btn-count {
        margin: 0 20px;
      }
    }
    .form-check {
      display: flex;
      align-items: center;
      margin: 0 20px;
      .el-form-item {
        display: flex;
        align-items: center;
        margin-bottom: 0px;
      }

      // input {
      //   width: 50px;
      //   height: 25px;
      //   margin: 0 10px;
      //   // background-color: $color;
      //   border-color: $color;
      //   // border: red;
      //   user-select: none; /* 防止文字被滑鼠選取反白 */
      //   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23ccc'/%3e%3c/svg%3e");
      //   caret-color: transparent;
      // }
      // input:checked {
      //   background-color: $color;
      //   border: red;
      //   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
      // }
      // .form-check-label {
      //   font-size: 22px;
      //   color: $color;

      // }
    }
  }
}
</style>
