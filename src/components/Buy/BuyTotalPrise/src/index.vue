<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { reqGetCart } from '@/api/cart'
import { CartResponseData, CartsData } from '@/api/cart/type'
import useUserStore from '@/store/modules/user'
import { ElMessage, ElMessageBox } from 'element-plus/lib/components/index.js'

let userStore = useUserStore()

let $router = useRouter()

const sum = ref(0)

const carts = ref<CartsData>({
  shopName: '',
  orderable: false,
  cartResponses: [],
  schedules: [],
  deliveryKm: 0,
  deliveryPrice: 0,
})

const link = () => {
  if (carts.value.shopId) {
    $router.push('/BuyShop/' + carts.value.shopId)
  } else {
    $router.push('/')
  }
}

const textarea = ref('')

// 计算日期选项
const startOptionDay = new Date()
const oneWeekLater = new Date()
oneWeekLater.setDate(startOptionDay.getDate() + 7)

ElMessageBox.alert('購物車空的，購物去', '購物車', {
  callback: () => {
    // 关闭弹窗的回调函数
    ElMessageBox.close()
    $router.push('/')
  },
})

// 设置定时器，在 10 秒后关闭消息框
const timer = setTimeout(() => {
  const messageBoxInstance = ElMessageBox
  if (messageBoxInstance) {
    messageBoxInstance.close()

    $router.push('/')
  }
}, 5000) // 10000 毫秒即为 10 秒
const getCart = async () => {
  let res: CartResponseData = await reqGetCart()
  if (res.status === 200) {
    if (res.data.cartResponses && res.data.cartResponses?.length !== 0) {
      carts.value = res.data
      userStore.cartCount =
        res.data.cartResponses?.length > 0
          ? res.data.cartResponses.reduce(
              (total, cartData) => total + cartData.qty,
              0,
            )
          : 0

      sum.value = carts.value.cartResponses.reduce(
        (total, v) => total + v.qty * v.productResponse.price,
        0,
      )
    } else {
      // 在需要弹出消息框的地方调用以下代码
      timer
    }
  } else {
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}

let isChangeAddress = ref<boolean>(true)
onMounted(() => {
  getCart()
})

const d = ref('')
const t = ref('')

type DeliveryTime = {
  date: {}
  time: string
}
const deliveryTime = ref<DeliveryTime>({
  date: '',
  time: '',
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>
<template>
  <span class="total">總金額:</span>
  <span class="total-data">NT${{ sum }}</span>
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
$table-cell-padding-y: 1.5rem; //
$table-border-color: rgb(155, 155, 155); //
@import 'node_modules/bootstrap/scss/_tables.scss';

.is-disabled {
  // color: #ffffff63;
}
.shopCart {
  display: block;
  overflow: hidden;

  .shopCart-header {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 40px;
      margin: 20px 0;
    }
    span {
      font-size: 18px;
      margin: 10px 0;
      padding: 10px 0;
    }
  }
  .shopCart-body {
    .item {
      margin: 10px 50px;
    }
    .date-time-item {
      display: grid;
      .date-time {
        // margin: 10px 0px 0px 10px;
      }
    }
    .address {
      .address-radio {
        //   margin: 10px;
        // margin: 100px;
        display: flex;
        flex-direction: column;

        .el-radio-group {
          margin: 0 0 10px 0;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: center;
          .el-radio {
            display: flex;
            flex-direction: center;
            justify-content: center;
          }
        }
        .address-edit {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: center;
          justify-content: flex-end;
        }
      }
      .address-add {
        margin: 0 0 0 10px;
        .address {
          margin: 10px 0;
        }

        .button {
          display: flex;
          align-items: center;
          position: relative;
          height: 40px;
          .button-left {
            position: relative;
            left: 0px;
          }

          .button-right {
            position: absolute;
            right: 0px;
          }
        }
      }
    }
    .textarea {
      .el-form-item {
        width: 500px;
        margin: 10px;

        div {
          caret-color: white;
        }
      }
    }

    .body-right {
      margin: 10px;

      display: flex;
      flex-direction: column;
      .total {
        font-size: 20px;
        margin: 0 0 5px 10px;
        color: #818181;
      }
      .total-data {
        font-size: 30px;
        margin: 0 0 0 10px;
      }
      button {
        margin: 5px 0;
        background-color: $color;
        border: 0;
      }
      .button-wight {
        background-color: white;
        color: #000;
      }
      .button-orange:hover {
        background-color: rgb(253, 102, 20);
      }
      .button-wight:hover {
        background-color: rgba(253, 114, 1, 0.247);
        color: #000;
      }
    }
  }
  @media (max-width: $breakpoint-xs) {
    margin: 10px;
  }
}
</style>
