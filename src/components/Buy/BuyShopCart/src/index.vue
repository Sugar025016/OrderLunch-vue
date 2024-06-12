<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { reqGetCart, reqDeleteCart, reqPutCart } from '@/api/cart'
import { CartList, CartResponseData, CartsData } from '@/api/cart/type'
import useUserStore from '@/store/modules/user'
import useShopStore from '@/store/modules/shop'
import rwdBody from '@/components/layout/rwdBody/index.vue'
import { ElMessageBox } from 'element-plus'

let userStore = useUserStore()
let shopStore = useShopStore()
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

const shopLink = () => {
  if (carts.value?.shopId) {
    $router.push('/BuyShop/' + carts.value.shopId)
  } else {
    $router.push('/')
  }
}

const checkLink = () => {
  if (carts.value.deliveryPrice > sum.value) {
    ElMessageBox.alert(
      `未滿外送金額${carts.value.deliveryPrice}元，還差${
        carts.value.deliveryPrice - sum.value
      }元，購物去`,
      '未滿外送金額',
      {
        callback: () => {
          // 關閉彈跳窗的回調函數
          ElMessageBox.close()
          $router.push('/BuyShop/' + carts.value.shopId)
        },
      },
    )
  } else {
    $router.push('/BuyCheck')
  }
}

let timer: any
const getCart = async () => {
  let res: CartResponseData = await reqGetCart()

  if (res.status === 200) {
    carts.value = res.data
    userStore.cartCount = getCartCount(res.data.cartResponses)
    sum.value = 0
    if (userStore.cartCount !== 0) {
      sum.value = carts.value.cartResponses.reduce(
        (total, v) => total + v.qty * v.productResponse.price,
        0,
      )
    } else {
      getElMessageBox()
    }
  }
}

const getElMessageBox = () => {
  ElMessageBox.alert('購物車空的，購物去', '購物車', {
    callback: () => {
      // 關閉彈跳窗的回調函數
      ElMessageBox.close()
      $router.push('/')
    },
  })
  timer = setTimeout(() => {
    const messageBoxInstance = ElMessageBox
    if (messageBoxInstance) {
      messageBoxInstance.close()

      $router.push('/')
    }
  }, 5000) // 10000 毫秒即为 10 秒
}

const deleteCart = async (cartId: number) => {
  let res: CartResponseData = await reqDeleteCart(cartId)
  if (res.status === 200) {
    carts.value = res.data
    if (res.data.cartResponses) {
      userStore.cartCount = getCartCount(res.data.cartResponses)
    } else {
      userStore.cartCount = 0
    }
    if (userStore.cartCount === 0) {
      getElMessageBox()
    }
  }
}
const getCartCount = (cartResponses: CartList) => {
  if (cartResponses) {
    return cartResponses.length > 0
      ? cartResponses.reduce((total, cartData) => total + cartData.qty, 0)
      : 0
  } else {
    return 0
  }
}

const updateCart = async (cartId: number, qty: number) => {
  let res: CartResponseData = await reqPutCart(cartId, qty)
  if (res.status === 200) {
    carts.value = res.data
    userStore.cartCount = getCartCount(res.data.cartResponses)
    getCart()
  }
}

onMounted(() => {
  getCart()
})
onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>
<template>
  <div class="shopCart">
    <rwdBody>
      <template #slotName>
        <div class="shopCart-header">
          <h1>購物車</h1>
        </div>
        <div class="shopCart-body">
          <el-row class="" :gutter="20">
            <!-- <el-col :span="16"> -->
            <div class="el-col">
              <span>
                訂購店家:{{ carts.shopName }}，滿{{ carts.deliveryPrice }}可外送
              </span>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="table-title">商品名稱</th>
                    <th scope="col" class="table-title">訂購人</th>
                    <th scope="col" class="table-title">備註</th>
                    <th scope="col" class="table-title">單價</th>
                    <th scope="col" class="table-title">數量</th>
                    <th scope="col" class="table-title">小計</th>
                    <th scope="col" class="table-title">變更</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cart in carts.cartResponses">
                    <th class="table-content" scope="row">
                      {{ cart.productResponse.productName }}
                    </th>
                    <td class="table-content table-width">
                      {{ cart.orderUsername }}
                    </td>
                    <td class="table-content remark">
                      <el-popover
                        placement="top-start"
                        title="備註"
                        :width="200"
                        trigger="hover"
                        :content="cart.remark"
                      >
                        <template #reference>
                          {{ cart.remark }}
                        </template>
                      </el-popover>
                    </td>
                    <td class="table-content table-width">
                      {{ cart.productResponse.price }}
                    </td>
                    <td class="table-content">
                      <el-input-number
                        v-model="cart.qty"
                        :min="1"
                        :max="10"
                        @click="updateCart(cart.cartId, cart.qty)"
                        size="small"
                      />
                    </td>
                    <td class="table-content">
                      {{ cart.productResponse.price * cart.qty }}
                    </td>
                    <td class="table-content">
                      <el-icon @click="deleteCart(cart.cartId)">
                        <DeleteFilled />
                      </el-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <el-col :span="8"> -->
            <div class="el-col">
              <div class="body-right">
                <span class="total">總金額:</span>
                <span class="total-data">NT${{ sum }}</span>
                <hr />
                <el-button
                  type="warning"
                  size="large"
                  class="button-orange"
                  @click="checkLink"
                  round
                >
                  確認訂單
                </el-button>
                <el-button
                  type="warning"
                  size="large"
                  class="button-wight"
                  @click="shopLink"
                  round
                >
                  繼續購物
                </el-button>
                <el-button
                  type="warning"
                  size="large"
                  class="button-wight"
                  round
                >
                  糾團
                </el-button>
              </div>
            </div>
          </el-row>
        </div>
      </template>
    </rwdBody>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
$table-cell-padding-y: 1.5rem;
$table-border-color: rgb(155, 155, 155);
@import 'node_modules/bootstrap/scss/_tables.scss';

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
    .el-row {
      display: grid; /* 使用CSS Grid布局 */
      grid-template-columns: minmax(760px, 9fr) minmax(180px, 3fr);

      .table {
        // width: 800px;
        overflow: auto;
        tr {
          .table-title {
            text-align: center;
            min-width: 80px;
          }
          .el-icon {
            cursor: pointer; /* 添加手型光标效果 */
          }
          .table-content {
            text-align: center;
          }
          .table-width {
            max-width: 100px;
          }
          .remark {
            white-space: nowrap; /* 让文字不换行 */
            overflow: hidden; /* 隐藏溢出部分 */
            text-overflow: ellipsis; /* 显示省略号 */
            max-width: 200px;
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

      @media (max-width: $breakpoint-md) {
        grid-template-columns: repeat(1, 1fr);
        .el-col {
          width: 100%;
          overflow: auto;
        }
        .el-col:first-child {
          margin: 10px;
        }
      }
    }
  }
}
</style>
